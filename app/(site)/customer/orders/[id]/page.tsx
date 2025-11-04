import { notFound } from "next/navigation"
import { auth } from '@/app/(auth)/auth'
import { getBuyOrderById } from '@/lib/db/queries'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import StaticMap from "@/components/static-map"

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()
  if (!session?.user?.id) {
    notFound()
  }

  const order = await getBuyOrderById(params.id)
  if (!order) {
    notFound()
  }

  // Verify that the order belongs to the current user
  if (order.userId !== session.user.id) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/customer">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">جزئیات سفارش</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات سفارش</CardTitle>
            <CardDescription>شماره سفارش: {order.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">وضعیت سفارش</h3>
                  <p
                    className={`text-sm font-medium ${
                      order.status === "پرداخت شده"
                        ? "text-green-600"
                        : order.status === "لغو شده"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">تاریخ ثبت سفارش</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">مشخصات سفارش</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">شهر:</span> {order.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">حجم:</span> {order.volume} {order.unit}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">قیمت:</span> {order.price} تومان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات موقعیت</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">آدرس</h3>
                <p className="text-sm text-muted-foreground">{order.city}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">مختصات</h3>
                <p className="text-sm text-muted-foreground">
                  طول جغرافیایی: {order.lng}
                </p>
                <p className="text-sm text-muted-foreground">
                  عرض جغرافیایی: {order.lat}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <StaticMap 
                lng={parseFloat(order.lng)} 
                lat={parseFloat(order.lat)} 
                city={order.city}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 