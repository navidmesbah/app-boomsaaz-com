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
        مصالح
      </h1>
      <p>
        لیست قیمت مصالح ساختمانی
      </p>
      <Table>
        <TableCaption>لیست قیمت مصالح ساختمانی</TableCaption>
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
    material: "سیمان تیپ ۲",
    pricePerUnit: "۵۰,۰۰۰ تومان",
    unit: "کیسه ۵۰ کیلویی",
    availability: "موجود",
  },
  {
    material: "میلگرد ۱۴ آجدار",
    pricePerUnit: "۲۴,۰۰۰ تومان",
    unit: "کیلوگرم",
    availability: "موجود",
  },
  {
    material: "شن و ماسه شسته",
    pricePerUnit: "۸۵,۰۰۰ تومان",
    unit: "تن",
    availability: "ناموجود",
  },
  {
    material: "آجر فشاری",
    pricePerUnit: "۳,۵۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
  {
    material: "گچ ساختمانی",
    pricePerUnit: "۴۵,۰۰۰ تومان",
    unit: "کیسه ۳۰ کیلویی",
    availability: "موجود",
  },
  {
    material: "کاشی دیواری ۳۰×۶۰",
    pricePerUnit: "۲۵۰,۰۰۰ تومان",
    unit: "متر مربع",
    availability: "در انتظار تأمین",
  },
  {
    material: "تیغه سفالی ۱۰ سانتی",
    pricePerUnit: "۶,۰۰۰ تومان",
    unit: "عدد",
    availability: "موجود",
  },
]

