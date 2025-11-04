"use client"

import Image from "next/image"
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
    <div className="p-4">
      <div className="flex flex-col gap-4 md:flex-row max-w-[1000px] mx-auto mt-16">
        <div className="md:w-1/3">
          <h2 className="text-lg font-medium mb-4">روندهای بازار</h2>
          <p>
            در سال گذشته، تقاضای مصالح ساختمانی ۱۲٪ افزایش یافت. این رشد عمدتاً به دلیل پروژه‌های عمرانی و ساخت‌وساز در مناطق شهری بوده است.
          </p>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-lg font-medium mb-4">نوسانات قیمت</h2>
          <p>
            قیمت سیمان در شش ماه گذشته ۱۸٪ افزایش یافت، درحالی‌که قیمت میلگرد نوساناتی در حدود ۱۰٪ تجربه کرده است.
          </p>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-lg font-medium mb-4">پیش‌بینی‌ها</h2>
          <p>
            پیش‌بینی‌ها نشان می‌دهند که قیمت آهن‌آلات به دلیل افزایش تقاضای جهانی در سه‌ماهه آینده حدود ۷٪ رشد خواهد کرد.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row max-w-[1000px] mx-auto mt-16">
        <div className="md:w-1/2">
          <h2 className="text-lg font-medium mb-4">داشبورد‌های تخصصی</h2>
          <p>
            بر اساس داده‌ها، پروژه‌های زیرساختی در سال جاری به ۲۵٪ از کل مصرف میلگرد کشور اختصاص خواهند یافت. این روند می‌تواند منجر به کاهش ذخایر و افزایش قیمت شود.
          </p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-lg font-medium mb-4">پیشنهادات خرید</h2>
          <p>
            با خرید مصالح و تجهیزات در سه‌ماهه اول سال، می‌توانید از افزایش ۱۰٪ پیش‌بینی‌شده قیمت‌ها در تابستان جلوگیری کنید.
          </p>
        </div>
      </div>
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
      <div className="flex flex-col gap-4 md:flex-row max-w-[1000px] mx-auto mt-16">
        <div className="md:w-2/3">
          <h2 className="text-lg font-medium mb-4">تأثیر پروژه‌های عمرانی بر بازار</h2>
          <p>
            با آغاز پروژه‌های ملی مانند بازسازی زیرساخت‌های شهری، تقاضا برای سیمان، شن، ماسه و میلگرد به‌طور قابل‌توجهی افزایش یافته است. این روند نشان‌دهنده افزایش فعالیت‌های عمرانی در سال گذشته بوده و انتظار می‌رود در سال جاری نیز ادامه یابد.
          </p>
          <Image src="/construction_materials_market_chart.png" alt="hero" width={1000} height={707} className="w-full mt-4 bg-amber-50" />
        </div>
        <div className="md:w-1/3">
          <h2 className="text-lg font-medium mb-4">تقاضای تجهیزات ساختمانی</h2>
          <p>
            افزایش ساخت‌وسازها در مناطق مسکونی باعث رشد ۱۵٪ در فروش تجهیزات ساختمانی از جمله ماشین‌آلات سبک و ابزارآلات برقی شده است.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row max-w-[1000px] mx-auto mt-16">
        <div className="md:w-1/2">
          <h2 className="text-lg font-medium mb-4">تحلیل صادرات</h2>
          <p>
            صادرات آهن‌آلات به کشورهای همسایه در سال گذشته ۲۰٪ رشد داشته است، که این موضوع نقش مهمی در افزایش قیمت داخلی ایفا کرده است.
          </p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-lg font-medium mb-4">قیمت جهانی مواد اولیه</h2>
          <p>
            قیمت جهانی مواد اولیه مانند سنگ‌آهن و نفت به‌طور مستقیم بر قیمت نهایی محصولات ساختمانی و آهن‌آلات تأثیر گذاشته است.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row max-w-[1000px] mx-auto mt-16">
        <div className="md:w-1/3">
          <h2 className="text-lg font-medium mb-4">وضعیت بازار داخلی</h2>
          <p>
            بررسی‌ها نشان می‌دهد که قیمت میلگرد داخلی به دلیل نوسانات ارزی در سه‌ماهه اول سال حدود ۸٪ افزایش داشته است.
          </p>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-lg font-medium mb-4">تحلیل کلی بازار</h2>
          <p>
            بازار مصالح ساختمانی و آهن‌آلات تحت تأثیر عوامل متعددی از جمله نوسانات ارز، افزایش تقاضا در پروژه‌های عمرانی و سیاست‌های وارداتی قرار دارد. پیش‌بینی می‌شود در نیمه دوم سال، قیمت‌ها در برخی بخش‌ها مانند تجهیزات ساختمانی به دلیل کاهش عرضه جهانی افزایش یابد. همچنین، رشد صادرات آهن‌آلات می‌تواند تأثیر مثبتی بر تعادل اقتصادی این صنعت داشته باشد.
          </p>
          <Image src="/balanced_construction_materials_market_barchart.png" alt="hero" width={1000} height={707} className="w-full mt-4 bg-amber-50" />
        </div>
      </div>
    </div>
  )
}
