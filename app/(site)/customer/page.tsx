// "use client"

import Link from "next/link"
import React from "react"
import { cookies } from "next/headers";

// import { Separator } from "@/components/ui/separator"
// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

import { auth } from '@/app/(auth)/auth';
import { getBuyOrdersByUserId } from '@/lib/db/queries';

// import { Check } from "lucide-react"
import Map from './map'

// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Plus, ArrowLeft } from "lucide-react"

export default async function CustomerPage() {
  // disable cache for this server action
  const _cookies = cookies()

  const session = await auth();

  const orders = await getBuyOrdersByUserId(session?.user?.id || "");

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">سفارش‌های شما</h1>
        <Link href="/customer/order">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            ثبت سفارش جدید
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            هنوز سفارشی ثبت نکرده‌اید
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            {orders.map((order, index) => (
              <Link 
                key={order.id} 
                href={`/customer/orders/${order.id}`}
                className={`block hover:bg-accent/50 transition-colors ${
                  index !== orders.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">شماره سفارش: {order.id}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === "پرداخت شده"
                            ? "bg-green-100 text-green-700"
                            : order.status === "لغو شده"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>شهر: {order.city}</p>
                      <p>حجم: {order.volume} {order.unit}</p>
                      <p>قیمت: {order.price} تومان</p>
                      <p>تاریخ: {new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
                    </div>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
