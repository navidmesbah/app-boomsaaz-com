// import Link from "next/link"
import React from "react"
import Link from "next/link"

// import { Separator } from "@/components/ui/separator"
// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

// import { getBuyOrder } from '@/lib/db/queries';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getBuyOrders, getSellOrders } from '@/lib/db/queries';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function Analytics() {
  const buyOrders = await getBuyOrders();
  const sellOrders = await getSellOrders();

  return (
    <div className="space-y-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>لیست سفارشات خرید</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {buyOrders.map((order) => (
              <Link 
                key={order.id} 
                href={`/admin/buy/${order.id}`}
                className="block"
              >
                <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">شماره سفارش:</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">قیمت:</p>
                    <p className="font-medium">{order.price} تومان</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">حجم:</p>
                    <p className="font-medium">{order.volume} {order.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">شهر:</p>
                    <p className="font-medium">{order.city}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        order.status === "پرداخت شده"
                          ? "bg-green-500"
                          : order.status === "لغو شده"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </p>
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>لیست سفارشات فروش</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {sellOrders.map((order) => (
              <Link 
                key={order.id} 
                href={`/admin/sell/${order.id}`}
                className="block"
              >
                <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">شماره سفارش:</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">قیمت:</p>
                    <p className="font-medium">{order.price} تومان</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">حجم:</p>
                    <p className="font-medium">{order.volume} {order.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">شهر:</p>
                    <p className="font-medium">{order.city || "نامشخص"}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        order.status === "پرداخت شده"
                          ? "bg-green-500"
                          : order.status === "لغو شده"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </p>
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
