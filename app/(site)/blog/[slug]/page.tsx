import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { BackToBlogButton } from "../components/BackToBlogButton"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto p-4 font-light text-sm text-muted-foreground mb-8">
      <div className="mt-8 mb-6">
        <BackToBlogButton />
      </div>
      
      <article className="prose prose-lg dark:prose-invert max-w-none mt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-medium">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs mt-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <div className="flex gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-muted rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
      <div className="mt-8 pt-8 border-t border-border">
        <BackToBlogButton />
      </div>
    </div>
  )
} 