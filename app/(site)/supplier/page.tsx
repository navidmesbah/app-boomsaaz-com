// "use client"

import Link from "next/link"
import React from "react"
import { cookies } from "next/headers";

// import { Separator } from "@/components/ui/separator"
// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

import { auth } from '@/app/(auth)/auth';
import { getSellOrdersByUserId } from '@/lib/db/queries';

// import { Check } from "lucide-react"
// import Map from './map'

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch"

export default async function Analytics() {
  // disable cache for this server action
  const _cookies = cookies()

  const session = await auth();

  const orders = await getSellOrdersByUserId(session?.user?.id || "");

  return (
    <>
      <Card className="w-full max-w-[1200px] mx-auto my-4">
        <CardHeader>
          <CardTitle>سفارش‌های فروش شما</CardTitle>
          <CardDescription>تاریخچه و پیگیری سفارش‌های فروش</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <div className=" flex items-center space-x-4 space-x-reverse rounded-md border p-4">
            <Check />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                سیمان
              </p>
              <p className="text-sm text-muted-foreground">
                {orders[0].price}
              </p>
            </div>
          </div> */}
          {/* <div>
            {orders.map((order, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    سیمان
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.unit}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.volume}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
          <div>
            {orders.length !== 0 && orders.map((item) => (
              <Link key={item.id} href="#">
                <div className="hover:bg-gray-100 transition cursor-pointe border-b">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      {/* <p className="text-sm font-medium">شهر: {item.city}</p> */}
                      <p className="text-sm">محصول: سیمان</p>
                      <p className="text-sm">حجم: {item.volume} کیسه</p>
                      <p className="text-sm">قیمت هر کیسه: {item.price} تومان</p>
                    </div>
                    <div>
                      {/* <p
                        className={`text-sm font-bold ${item.status === "پرداخت شده"
                          ? "text-green-600"
                          : item.status === "لغو شده"
                            ? "text-red-600"
                            : "text-yellow-600"
                          }`}
                      >
                        {item.status}
                      </p> */}
                      <p className="text-sm">مکان: {item.city}</p>
                    </div>
                  </div>
                  {/* <Map lng={item.lng} lat={item.lat} /> */}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/supplier/order" className="w-full">
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
              ایجاد سفارش فروش جدید
            </button>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
