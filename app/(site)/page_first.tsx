"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"

import { Button } from "@/components/ui/button"
import { SignIn, Wall, StackSimple, Archive } from "@phosphor-icons/react/dist/ssr"

import { TrendingUp } from "lucide-react"
import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "سال ۱۳۸۰", desktop: 237, mobile: 200 },
  { month: "سال ۱۳۸۱", desktop: 305, mobile: 250 },
  { month: "سال ۱۳۸۲", desktop: 186, mobile: 350 },
  { month: "سال ۱۳۸۳", desktop: 214, mobile: 400 },
  { month: "سال ۱۳۸۴", desktop: 209, mobile: 800 },
  { month: "سال ۱۳۸۵", desktop: 73, mobile: 800 },
  { month: "سال ۱۳۸۶", desktop: 237, mobile: 700 },
  { month: "سال ۱۳۸۷", desktop: 305, mobile: 1000 },
  { month: "سال ۱۳۸۸", desktop: 186, mobile: 1100 },
  { month: "سال ۱۳۸۹", desktop: 186, mobile: 1200 },
  { month: "سال ۱۳۹۰", desktop: 186, mobile: 1250 },
  { month: "سال ۱۳۹۱", desktop: 186, mobile: 1250 },
  { month: "سال ۱۳۹۲", desktop: 186, mobile: 1250 },
  { month: "سال ۱۳۹۳", desktop: 237, mobile: 1100 },
  { month: "سال ۱۳۹۴", desktop: 305, mobile: 1100 },
  { month: "سال ۱۳۹۵", desktop: 186, mobile: 1200 },
  { month: "سال ۱۳۹۶", desktop: 214, mobile: 1400 },
  { month: "سال ۱۳۹۷", desktop: 209, mobile: 1400 },
  { month: "سال ۱۳۹۸", desktop: 73, mobile: 1300 },
  { month: "سال ۱۳۹۹", desktop: 237, mobile: 1500 },
  { month: "سال ۱۴۰۰", desktop: 305, mobile: 1550 },
  { month: "سال ۱۴۰۱", desktop: 186, mobile: 1600 },
  { month: "سال ۱۴۰۲", desktop: 186, mobile: 2000 },
  { month: "سال ۱۴۰۳", desktop: 186, mobile: 2100 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-6))",
  },
  mobile: {
    label: "قیمت سیمان",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Analytics() {
  return (
    <>
      <div className="bg-sky-50 dark:bg-stone-900">
        <div className="mx-auto max-w-[1024px] grid md:grid-cols-2 gap-2 p-4">
          <div className="order-last md:order-first">
            <Image src="/boomsaaz.jpg" alt="hero" width={640} height={427} className="w-full bg-amber-50" />
          </div>
          <div>
            <div className="py-4 md:py-16 md:px-8 max-w-[360px]">
              <h1>
                <span className="text-xl font-normal pl-0.5">
                  بررسی، انتخاب و سفارش <br />
                </span>
                <span className="text-6xl font-medium leading-[4rem]">
                  مصالح ساختمانی
                </span>
              </h1>
              <h2>
                <span className="text-2xl font-normal">
                  در بوم ساز سفارش دهید<br />
                </span>
                <span className="text-xl font-normal pr-1">
                  حرفه‌ای تحویل بگیرید:
                </span>
              </h2>
              {/* <ul className="list-disc text-2xl md:text-3xl font-medium text-primary pr-4">
                <li>بررسی محصولات</li>
                <li>انتخاب آدرس</li>
              </ul> */}
              <div className="pt-4">
                <Button variant="default" asChild className="bg-stone-950 dark:bg-stone-600">
                  <Link href="/customer/order">
                    <span>سفارش</span>
                    <SignIn className="size-5 mr-2 rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="mx-auto max-w-[1000px] p-4 md:py-16">
          <h3 className="text-5xl font-medium text-center p-4">تحلیل بازار</h3>
          <p className="text-center py-4">
            تحلیل دقیق بازار مصالح و آهن‌آلات با بررسی روند قیمت‌ها، نوسانات و پیش‌بینی‌ها برای تصمیم‌گیری هوشمندانه‌تر در خرید و فروش.
          </p>
          <div className="pt-4 pb-8 text-center">
            <Button variant="default" asChild className="bg-stone-950 dark:bg-stone-600">
              <Link href="/market">
                <span>تحلیل بازار</span>
                <SignIn className="size-5 mr-2 rotate-180" />
              </Link>
            </Button>
          </div>
          {/* <Image src="/work-from-home.svg" alt="hero" width={960} height={960} className="w-full bg-white" /> */}
          <div className="p-4">
            <Card className="max-w-[1000px] mx-auto mt-8">
              <CardHeader>
                <CardTitle>قیمت سیمان</CardTitle>
                <CardDescription>
                  صعود قیمت سیمان در بیست سال گذشته
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      // cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    {/* <Line
              dataKey="mobile"
              type="linear"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              // stackId="a"
              isAnimationActive={false}
            /> */}
                    <Line
                      type="linear"
                      dataKey="mobile"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      isAnimationActive={false}
                      dot={false}
                    />
                    {/* <Line
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            /> */}
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      صعود پنج درصدی در امسال <TrendingUp className="size-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      سال ۱۳۸۰ - ۱۴۰۳
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="bg-background py-4">
        <h3 className="text-5xl font-medium text-center p-4">لیست قیمت</h3>
        <p className="text-center py-4">
          جدیدترین لیست قیمت مصالح ساختمانی، آهن‌آلات و تجهیزات؛ به‌روز، دقیق و شفاف برای برنامه‌ریزی بهتر پروژه‌های ساختمانی شما.
        </p>
        <div className="pt-4 pb-8 text-center">
          <Button variant="default" asChild className="bg-stone-950 dark:bg-stone-600">
            <Link href="/pricing/material">
              <span>لیست قیمت</span>
              <SignIn className="size-5 mr-2 rotate-180" />
            </Link>
          </Button>
        </div>
        <div className="mx-auto max-w-[1024px] grid md:grid-cols-3">
          <Link href="/pricing/material" className="border rounded text-center m-2">
            <h6 className="text-3xl font-medium px-4 pt-8">مصالح</h6>
            <p className="text-center p-4 min-h-60">
              لیست قیمت مصالح ساختمانی شامل انواع سیمان، گچ، آجر، بلوک، شن و ماسه، به‌صورت به‌روز و دقیق ارائه شده است. این بخش با تحلیل بازار و بررسی تأمین‌کنندگان معتبر، اطلاعاتی شفاف برای برنامه‌ریزی خرید و کاهش هزینه‌ها در پروژه‌های ساختمانی شما فراهم می‌کند.
            </p>
            {/* <Image src="/boomsaaz.jpg" alt="hero" width={960} height={960} className="w-full bg-white" /> */}
            <Wall size={84} className="w-full p-4 mb-12 stroke-current" />
          </Link>
          <Link href="/pricing/metal" className="border rounded text-center m-2">
            <h6 className="text-3xl font-medium px-4 pt-8">آهن آلات</h6>
            <p className="text-center p-4 min-h-60">
              قیمت‌های به‌روز انواع آهن‌آلات شامل میلگرد، تیرآهن، ورق، نبشی، ناودانی و پروفیل، با جزئیات کامل در دسترس شماست. این بخش علاوه بر ارائه اطلاعات دقیق، تحلیل نوسانات بازار را فراهم کرده و امکان انتخاب بهینه تأمین‌کنندگان را برای کاربران ایجاد می‌کند.
            </p>
            {/* <Image src="/boomsaaz.jpg" alt="hero" width={960} height={960} className="w-full bg-white" /> */}
            <StackSimple size={84} className="w-full p-4 mb-12 stroke-current" />
          </Link>
          <Link href="/pricing/device" className="border rounded text-center m-2">
            <h6 className="text-3xl font-medium px-4 pt-8">تجهیزات</h6>
            <p className="text-center p-4 min-h-60">
              در بخش تجهیزات ساختمانی، قیمت انواع ابزارآلات برقی، ماشین‌آلات سبک، قالب‌بندی‌ها و دیگر تجهیزات موردنیاز پروژه‌ها به‌صورت کامل و شفاف ارائه می‌شود. تحلیل قیمت‌ها و دسترسی به اطلاعات تأمین‌کنندگان معتبر، تجربه‌ای راحت و مطمئن برای خرید تجهیزات موردنیاز شما فراهم می‌کند.
            </p>
            {/* <Image src="/boomsaaz.jpg" alt="hero" width={960} height={960} className="w-full bg-white" /> */}
            <Archive size={84} className="w-full p-4 mb-12 stroke-current" />
          </Link>
        </div>
      </div>
    </>
  )
}