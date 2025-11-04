'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
import { Square, Play, Circle } from "@phosphor-icons/react/dist/ssr"

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
        <nav className="items-center justify-between gap-4 h-14 lg:h-[60px] hidden md:flex">
          <Link href="/customer" className="flex items-center gap-2 font-semibold">
            {/* <Package2 className="h-6 w-6" /> */}
            <span className="font-medium">خریدار</span>
          </Link>
          {/* <Link
            href="/customer"
            className="shrink-0"
          >
            <MagnifyingGlass className="size-6" />
            <span className="sr-only">Search</span>
          </Link> */}
        </nav>
        <nav className="flex items-center justify-between gap-4 h-14 px-4 lg:h-[60px] md:hidden">
          <Link
            href="/customer"
            // className="shrink-0"
            className={pathname === "/customer" ? "shrink-0 text-centert text-primary" : "shrink-0 text-centert"}
          >
            <Play className="size-5 mx-auto" />
            <span className="text-sm font-light">داشبورد</span>
          </Link>
          <Link
            href="/customer/order"
            // className="shrink-0 text-center"
            className={pathname === "/customer/order" ? "shrink-0 text-centert text-primary" : "shrink-0 text-centert"}
          >
            <Circle className="size-5 mx-auto" />
            <span className="text-sm font-light">سفارش‌</span>
          </Link>
          <Link
            href="/customer/edit"
            // className="shrink-0"
            className={pathname === "/customer/edit" ? "shrink-0 text-centert text-primary" : "shrink-0 text-centert"}

          >
            <Square className="size-5 mx-auto" />
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
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="size-6" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </header>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-l bg-background md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            {/* <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"> */}
            <div className="flex h-8 items-center px-4 lg:px-6">
              {/* <Link href="/customers" className="flex items-center gap-2 font-semibold">
                <ChartLine2 className="h-6 w-6" />
                <span className="">Playgrounds</span>
              </Link> */}
              {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="size-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/customer"
                  // className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  // className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                  className={pathname === "/customer"
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}
                // className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Play className="size-5" />
                  داشبورد
                </Link>
                <Link
                  href="/customer/order"
                  // className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  // className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  className={pathname === "/customer/order"
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}
                >
                  <Circle className="size-5" />
                  سفارش‌
                </Link>
                <Link
                  href="/customer/edit"
                  // className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                  // className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  className={pathname === "/customer/edit"
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}
                >
                  <Square className="size-5" />
                  تنظیمات
                </Link>
              </nav>
            </div>
            {/* <div className="mt-auto p-4">
            <Card x-chunk="playground-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
          </div>
        </div>
        <div className="flex flex-col">
          {/* old header */}
          {/* <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"> */}
          <main className="flex flex-1 flex-col p-4">
            {/* <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="playground-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no products
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <Button className="mt-4">Add Product</Button>
              </div>
            </div> */}
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
