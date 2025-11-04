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
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
// import { MagnifyingGlass, SidebarSimple, Cube, Circle } from "@phosphor-icons/react/dist/ssr"

interface ChatLayoutProps {
  children: React.ReactNode;
  // params: {
  //   id: string;
  // };
}

export default function Dashboard({ children }: ChatLayoutProps) {
  return (
    <>
      <header className="sticky top-0  border-b bg-background px-4 lg:px-6 z-50">
        {/* <nav className="flex h-14 max-w-[1024px] mx-auto items-center justify-start gap-4 md:gap-6 lg:h-[60px] md:px-0.5"> */}
        <nav className="flex h-14 items-center justify-between lg:h-[60px] md:px-0.5 max-w-[940px] mx-auto">
          <h1 className="flex items-center font-medium">
            {/* <Play2 className="h-6 w-6" /> */}
            <span>لیست قیمت</span>
          </h1>
          <nav className="flex gap-4 md:gap-6">
            <Link href="/pricing/material" className="flex items-center font-light">
              {/* <Play2 className="h-6 w-6" /> */}
              <span className="text-muted-foreground text-sm">مصالح</span>
            </Link>
            <Link href="/pricing/metal" className="flex items-center font-light">
              {/* <Play2 className="h-6 w-6" /> */}
              <span className="text-muted-foreground text-sm">آهن آلات</span>
            </Link>
            <Link href="/pricing/device" className="flex items-center font-light">
              {/* <Play2 className="h-6 w-6" /> */}
              <span className="text-muted-foreground text-sm">تجهیزات</span>
            </Link>
          </nav>
          <div className="w-[80px] hidden md:block"></div>
        </nav>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="size-5" />
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
      <div className="grid min-h-screen w-full">
        {children}
      </div>
    </>
  )
}
