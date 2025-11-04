// import Link from "next/link"
import React from "react"


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export default function Analytics() {
  return (
    <div className="flex flex-col w-full max-w-[1000px] mx-auto p-4 font-light text-sm text-muted-foreground mb-8">
      <h1 className="text-3xl font-medium py-2 mt-8">
        آهن آلات
      </h1>
      <p>
        لیست قیمت آهن آلات
      </p>
      <Table>
        <TableCaption>لیست قیمت آهن آلات</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">کالا</TableHead>
            <TableHead className="text-right">قیمت</TableHead>
            <TableHead className="text-right">واحد</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.material}>
              <TableCell className="font-medium">{invoice.material}</TableCell>
              <TableCell>{invoice.pricePerUnit}</TableCell>
              <TableCell>{invoice.unit}</TableCell>
              {/* <TableCell className="text-right">{invoice.availability}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

const invoices = [
  {
    material: "میلگرد ۱۲ آجدار",
    pricePerUnit: "۲۵,۰۰۰ تومان",
    unit: "کیلوگرم",
    availability: "موجود",
  },
  {
    material: "نبشی ۵۰×۵۰",
    pricePerUnit: "۱۸۰,۰۰۰ تومان",
    unit: "متر",
    availability: "موجود",
  },
  {
    material: "پروفیل ۴۰×۴۰",
    pricePerUnit: "۱۵۰,۰۰۰ تومان",
    unit: "متر",
    availability: "ناموجود",
  },
  {
    material: "ورق گالوانیزه ۱ میلی‌متر",
    pricePerUnit: "۳۰۰,۰۰۰ تومان",
    unit: "متر مربع",
    availability: "موجود",
  },
  {
    material: "میلگرد ۱۰ آجدار",
    pricePerUnit: "۲۲,۰۰۰ تومان",
    unit: "کیلوگرم",
    availability: "در انتظار تأمین",
  },
  {
    material: "لوله مانیسمان ۲ اینچ",
    pricePerUnit: "۵۰۰,۰۰۰ تومان",
    unit: "متر",
    availability: "موجود",
  },
  {
    material: "پلیت فولادی ۱۰ میلی‌متر",
    pricePerUnit: "۴۰۰,۰۰۰ تومان",
    unit: "متر مربع",
    availability: "موجود",
  },
]
