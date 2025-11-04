import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

export function BackToBlogButton() {
  return (
    <Link 
      href="/blog" 
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowRight size={16} weight="bold" />
      <span>بازگشت به وبلاگ</span>
    </Link>
  )
} 