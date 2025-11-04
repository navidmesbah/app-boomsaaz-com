'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

import { CirclesFour, PlusCircle, Gear } from "@phosphor-icons/react/dist/ssr"

interface ChatLayoutProps {
  children: React.ReactNode;
  // params: {
  //   id: string;
  // };
}

// export default function playground({ children, params }: ChatLayoutProps) {
export default function Playground({ children }: ChatLayoutProps) {
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 border-b bg-background px-4 lg:px-6 z-50">
        <nav className="flex items-center justify-between gap-4 h-14 px-4 lg:h-[60px] w-full max-w-[400px] mx-auto">
          <Link
            href="/customer"
            // className="shrink-0"
            className={pathname === "/customer" ? "shrink-0 text-centert text-primary" : "shrink-0 text-centert"}
          >
            <CirclesFour className="size-5 mx-auto" />
            <span className="text-sm font-light">داشبورد</span>
          </Link>
          <Link
            href="/customer/order"
            // className="shrink-0 text-center"
            className={pathname === "/customer/order" ? "shrink-0 text-centert text-primary" : "shrink-0 text-centert"}
          >
            <PlusCircle className="size-5 mx-auto" />
            <span className="text-sm font-light">سفارش‌</span>
          </Link>
          <Link
            href="/customer/edit"
            // className="shrink-0"
            className={pathname === "/customer/edit" ? "shrink-0 text-centert text-primary" : "shrink-0 text-centert"}

          >
            <Gear className="size-5 mx-auto" />
            <span className="text-sm font-light">تنظیمات</span>
          </Link>
          {/* <Link
            href="/customer"
            className="shrink-0"
          >
            <MagnifyingGlass className="size-5 mx-auto" />
            <span className="text-sm font-light">جستجو</span>
          </Link> */}
        </nav>
      </header>
      <main className="flex flex-1 flex-col p-4">
        {children}
      </main>
    </>
  )
}
