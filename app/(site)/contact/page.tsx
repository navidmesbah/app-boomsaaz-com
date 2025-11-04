// import Link from "next/link"
import React from "react"

// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export default function Analytics() {
  return (
    <div className="flex flex-col w-full max-w-[600px] mx-auto p-4 font-light text-sm text-muted-foreground mb-8">
      <h1 className="text-3xl font-medium py-2 mt-8">
        تماس با ما
      </h1>
      <div className="text-gray-700 space-y-2">
        <p>استان فارس، شهرستان آباده</p>
        <p>بخش مرکزی، شهر آباده</p>
        <p>خیابان امام خمینی، خیابان فرصت شیرازی</p>
        <p>کوچه فرهمند، پلاک ۱، طبقه یک، واحد ۲</p>
        <p><strong>کد پستی:</strong> ۷۳۹۱۷۸۷۶۳۸</p>
        <p><strong>شماره‌های تماس:</strong></p>
        <p><a href="tel:+989171504921" className="text-blue-600">09171504921</a></p>
        <p><a href="tel:+989173206603" className="text-blue-600">09173206603</a></p>
        <p><strong>تلفن ثابت:</strong></p>
        <p><a href="tel:+987144354864" className="text-blue-600">07144354864</a></p>
        <p><strong>ایمیل:</strong></p>
        <p><a href="mailto:info@boomsaaz.com" className="text-blue-600">info@boomsaaz.com</a></p>
      </div>
    </div>
  )
}
