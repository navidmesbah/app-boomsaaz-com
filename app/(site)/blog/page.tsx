import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"

// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto p-4 font-light text-sm text-muted-foreground mb-8">
      <h1 className="text-3xl font-medium py-2 mt-8">
        وبلاگ
      </h1>
      <div className="grid gap-8 mt-8">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col gap-2">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-medium text-foreground hover:text-primary transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center gap-4 text-xs">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <p className="mt-2">{post.excerpt}</p>
            <div className="flex gap-2 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
