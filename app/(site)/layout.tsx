import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

import { ThemeToggle } from "@/components/theme-toggle"
import { Equals, SignIn, User } from "@phosphor-icons/react/dist/ssr"

import { SubmitButton } from './button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"


interface ChatLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default async function ChatLayout({ children, params }: ChatLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <header className="sticky top-0 border-b bg-background px-4"> */}
      <header className="bg-background px-2 md:px-4 z-50">
        <div className="mx-auto w-full max-w-[1024px] flex items-center h-11 md:gap-2">
          <Link
            href="/"
            className="flex items-center h-11 md:gap-2 min-w-fit mr-2"
          >
            {/* <svg
                    viewBox="0 0 1000 1000"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                  >
                    <rect width="1000" height="1000" fill="hsl(var(--foreground))" />
                    <rect x="650" y="300" width="90" height="650" transform="rotate(90 650 300)" fill="hsl(var(--background))" />
                    <rect x="1000" y="610" width="90" height="650" transform="rotate(90 1000 610)" fill="hsl(var(--background))" />
                    <rect x="715.36" y="221" width="90" height="700" transform="rotate(45 715.36 221)" fill="hsl(var(--background))" />
                    <rect x="1000" width="300" height="1000" transform="rotate(90 1000 0)" fill="hsl(var(--foreground))" />
                    <rect x="1000" y="700" width="300" height="1000" transform="rotate(90 1000 700)" fill="hsl(var(--foreground))" />
                  </svg> */}
            {/* <svg
              viewBox="0 0 1000 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <rect width="1000" height="1000" className="fill-foreground" />
              <circle cx="500" cy="500" r="300" className="fill-background" />
            </svg> */}
            <svg viewBox="0 0 1400 1400" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-7">
              <rect width="1400" height="1400" fill="#15A049" />
              {/* <rect width="1400" height="1400" className="fill-stone-500" /> */}
              <rect x="1150" y="250" width="100" height="100" fill="white" />
              <rect x="950" y="450" width="100" height="100" fill="white" />
              <rect x="550" y="750" width="100" height="400" fill="white" />
              <rect x="350" y="950" width="100" height="200" fill="white" />
              <rect x="150" y="350" width="100" height="300" fill="white" />
              <rect x="950" y="250" width="100" height="100" fill="white" />
              <rect x="550" y="250" width="100" height="100" fill="white" />
              <rect x="750" y="150" width="100" height="200" fill="white" />
              <rect x="350" y="250" width="100" height="100" fill="white" />
              <rect x="750" y="350" width="500" height="100" fill="white" />
              <rect x="550" y="1150" width="200" height="100" fill="white" />
              <rect x="850" y="1150" width="100" height="100" fill="white" />
              <rect x="1050" y="1150" width="100" height="100" fill="white" />
              <rect x="850" y="150" width="100" height="100" fill="white" />
              <rect x="750" y="1050" width="100" height="100" fill="white" />
              <rect x="950" y="1050" width="100" height="100" fill="white" />
              <rect x="1150" y="950" width="100" height="200" fill="white" />
              <rect x="350" y="150" width="300" height="100" fill="white" />
              <rect x="1150" y="550" width="100" height="100" fill="white" />
              <rect x="350" y="750" width="100" height="100" fill="white" />
              <rect x="750" y="550" width="200" height="100" fill="white" />
              <rect x="150" y="1150" width="200" height="100" fill="white" />
              <rect x="450" y="350" width="200" height="100" fill="white" />
              <rect x="150" y="250" width="200" height="100" fill="white" />
            </svg>
            {/* <span className="sr-only">بوم ساز</span> */}
            {/* <span className="font-medium">بوم ساز</span> */}
            {/* <span className="min-w-fit">TRUST</span> */}
          </Link>
          <nav className="hidden flex-col gap-6 text-lg font-normal md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {/* <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Zagros Forest</span>
                  </Link> */}
            <Link
              href="/store"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              فروشگاه
            </Link>
            <Link
              href="/market"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              تحلیل بازار
            </Link>
            <Link
              href="/pricing/material"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              لیست قیمت
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              تماس
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              وبلاگ
            </Link>
          </nav>
          <div className="flex items-center h-11 mr-auto">
            {/* <ThemeToggle /> */}
            <Button variant="link" className="px-2" asChild>
              <Link href="/customer/order">
                <span className="text-muted-foreground">سفارش</span>
                <SignIn className="size-5 fill-muted-foreground rotate-180" />
                {/* <span className="sr-only">حساب کاربری</span> */}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:inline-flex">
                <Button variant="link" className="px-2" asChild>
                  {/* <User className="size-5" /> */}
                  <span>
                    <span className="text-muted-foreground">حساب کاربری</span>
                    <User className="size-5 fill-muted-foreground" />
                  </span>
                  {/* <span className="sr-only">Toggle user menu</span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/customer">
                    خریدار
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/supplier">
                    فروشنده
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    مدیر
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <SubmitButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button variant="ghost" className="hidden md:inline-flex ml-2 md:ml-0" asChild>
                    <Link href="/playground">
                      <span className="ml-2">زمین بازی</span>
                      <SignIn className="size-5 rotate-180" />
                    </Link>
                  </Button> */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="link"
                  className="md:hidden px-2"
                >
                  {/* <Menu className="h-5 w-5" /> */}
                  <span className="text-muted-foreground">منو</span>
                  <Equals className="size-7 fill-muted-foreground" />
                  {/* <span className="sr-only">Toggle navigation menu</span> */}
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="size-full">
                <nav className="grid gap-6 text-2xl font-extralight">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      {/* <Package2 className="h-6 w-6" /> */}
                      <span className="sr-only">بوم ساز</span>
                    </Link>
                  </SheetClose>
                  {/* <SheetClose asChild>
                    <Link
                      href="/order"
                      className="text-muted-foreground hover:text-foreground"
                    // className="hover:text-foreground"
                    >
                      سفارش
                    </Link>
                  </SheetClose> */}
                  {/* <SheetClose asChild>
                          <Link
                            href="/playground"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            زمین بازی
                          </Link>
                        </SheetClose> */}
                  <SheetClose asChild>
                    <Link
                      href="/store"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      فروشگاه
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/market"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      تحلیل بازار
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/pricing/material"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      لیست قیمت
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      تماس
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      وبلاگ
                    </Link>
                  </SheetClose>
                  <Separator />
                  <SheetHeader>
                    <SheetTitle className="text-sm text-right font-normal text-muted-foreground">حساب کاربری</SheetTitle>
                    {/* <SheetDescription>
                      Make changes to your profile here. Click save when you're done.
                    </SheetDescription> */}
                  </SheetHeader>
                  <SheetClose asChild>
                    <Link
                      href="/customer"
                      className="flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <User className="size-5 ml-2 mt-0.5" />
                      خریدار
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/supplier"
                      className="flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <User className="size-5 ml-2 mt-0.5" />
                      فروشنده
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/admin"
                      className="flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <User className="size-5 ml-2 mt-0.5" />
                      مدیر
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <SubmitButton />
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {/* <div className="fixed w-full bottom-4">
              <div className="flex justify-end w-full max-w-[1024px] mx-auto pr-8">
                <ThemeToggle />
              </div>
            </div> */}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 md:gap-8">
        {/* <div className="mx-auto grid w-full max-w-7xl gap-2 mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold">{params.id.charAt(0).toUpperCase() + params.id.slice(1)}</h1>
        </div> */}
        {/* <div className="mx-auto grid w-full max-w-7xl items-start gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"> */}
        {/* <div className="mx-auto w-full max-w-[2560px]"> */}
        <div className="mx-auto w-full">
          {children}
        </div>
      </main>
      <footer className="border-t p-4">
        <div className="w-full max-w-[1024px] mx-auto">
          <div className="flex justify-between px-4">
            <Link
              href="/"
              className="flex items-center h-11 gap-2 text-lg font-semibold md:text-base min-w-fit"
            >
              <svg viewBox="0 0 1400 1400" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-7">
                <rect width="1400" height="1400" fill="#15A049" />
                {/* <rect width="1400" height="1400" className="fill-stone-500" /> */}
                <rect x="1150" y="250" width="100" height="100" fill="white" />
                <rect x="950" y="450" width="100" height="100" fill="white" />
                <rect x="550" y="750" width="100" height="400" fill="white" />
                <rect x="350" y="950" width="100" height="200" fill="white" />
                <rect x="150" y="350" width="100" height="300" fill="white" />
                <rect x="950" y="250" width="100" height="100" fill="white" />
                <rect x="550" y="250" width="100" height="100" fill="white" />
                <rect x="750" y="150" width="100" height="200" fill="white" />
                <rect x="350" y="250" width="100" height="100" fill="white" />
                <rect x="750" y="350" width="500" height="100" fill="white" />
                <rect x="550" y="1150" width="200" height="100" fill="white" />
                <rect x="850" y="1150" width="100" height="100" fill="white" />
                <rect x="1050" y="1150" width="100" height="100" fill="white" />
                <rect x="850" y="150" width="100" height="100" fill="white" />
                <rect x="750" y="1050" width="100" height="100" fill="white" />
                <rect x="950" y="1050" width="100" height="100" fill="white" />
                <rect x="1150" y="950" width="100" height="200" fill="white" />
                <rect x="350" y="150" width="300" height="100" fill="white" />
                <rect x="1150" y="550" width="100" height="100" fill="white" />
                <rect x="350" y="750" width="100" height="100" fill="white" />
                <rect x="750" y="550" width="200" height="100" fill="white" />
                <rect x="150" y="1150" width="200" height="100" fill="white" />
                <rect x="450" y="350" width="200" height="100" fill="white" />
                <rect x="150" y="250" width="200" height="100" fill="white" />
              </svg>
              <span className="sr-only">Platform</span>
              {/* <span className="min-w-fit font-medium">بوم ساز</span> */}
            </Link>
            <div className="flex items-center">
              <span className="text-sm pl-0.5">نور زمینه:</span>
              <ThemeToggle />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="p-4">
              <h1 className="font-medium py-2">تحلیل بازار</h1>
              <nav className="grid items-start text-sm font-medium">
                <Link
                  href="/market"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  چشم انداز
                </Link>
                <Link
                  href="/market"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  تازه‌ها
                </Link>
              </nav>
            </div>
            <div className="p-4">
              <h1 className="font-medium py-2">لیست قیمت</h1>
              <nav className="grid items-start text-sm font-medium">
                <Link
                  href="/pricing/material"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  مصالح
                </Link>
                <Link
                  href="/pricing/metal"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  آهن آلات
                </Link>
                <Link
                  href="/pricing/device"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  تجهیزات
                </Link>
              </nav>
            </div>
            <div className="p-4">
              <h1 className="font-medium py-2">شرکت</h1>
              <nav className="grid items-start text-sm font-medium">
                <Link
                  href="/about"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  درباره ما
                </Link>
                <Link
                  href="/contact"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  تماس با ما
                </Link>
                <Link
                  href="/blog"
                  className="py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  وبلاگ
                </Link>
              </nav>
            </div>
            <div className="p-4">
              <h1 className="font-medium py-2">نمادها</h1>
              <div className="grid items-start text-sm font-medium gap-4">
                <div className="flex gap-4 items-center">
                  {/* <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=YOUR_ENAMAD_ID">
                    <img referrerPolicy="origin" src="https://trustseal.enamad.ir/logo.aspx?id=YOUR_ENAMAD_ID" alt="نماد اعتماد الکترونیکی" className="cursor-pointer" />
                  </a> */}
                  <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=580542&Code=DULQ0U0tJ1Xz5IujB6chTeZTEDMDPxOZ">
                    <img referrerPolicy="origin" src="https://trustseal.enamad.ir/logo.aspx?id=580542&Code=DULQ0U0tJ1Xz5IujB6chTeZTEDMDPxOZ" alt="نماد اعتماد الکترونیکی" className="cursor-pointer" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.zarinpal.com/trustPage/boomsaaz.com">
                    <img src="https://cdn.zarinpal.com/badges/trustLogo/1.svg" alt="درگاه پرداخت زرین‌پال" className="cursor-pointer h-24" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface routesType {
  simulation: string[];
  research: string[];
}

const routes: routesType = {
  simulation: ["markets", "news"],
  research: ["chat", "trends"],
}
