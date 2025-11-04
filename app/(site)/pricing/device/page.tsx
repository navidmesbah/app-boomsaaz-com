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
        تجهیزات
      </h1>
      <p>
        لیست قیمت تجهیزات
      </p>
      <Table>
        <TableCaption>لیست قیمت تجهیزات</TableCaption>
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
    material: "دریل چکشی ۱۳ میلی‌متر",
    pricePerUnit: "۸۵۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
  {
    material: "دستگاه جوش اینورتر ۲۰۰ آمپر",
    pricePerUnit: "۳,۲۰۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
  {
    material: "فشارسنج دیجیتال",
    pricePerUnit: "۴۵۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "ناموجود",
  },
  {
    material: "متر لیزری ۳۰ متر",
    pricePerUnit: "۲۵۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
  {
    material: "کمپرسور هوا ۵۰ لیتر",
    pricePerUnit: "۲,۰۰۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "در انتظار تأمین",
  },
  {
    material: "پمپ بتن ۳۰ متر",
    pricePerUnit: "۱۵,۰۰۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
  {
    material: "الکترو موتور ۵ اسب بخار",
    pricePerUnit: "۵,۵۰۰,۰۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
]
