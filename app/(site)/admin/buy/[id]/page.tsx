import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getBuyOrderById } from "@/lib/db/queries"
import StaticMap from "@/components/static-map"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default async function BuyOrderDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const order = await getBuyOrderById(params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">جزئیات سفارش خرید</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات سفارش</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">اطلاعات سفارش</h3>
              <div className="mt-2 space-y-2">
                <p>شناسه سفارش: {order.id}</p>
                <p>وضعیت: {order.status}</p>
                <p>قیمت: {order.price}</p>
                <p>حجم: {order.volume} {order.unit}</p>
                <p>تاریخ ایجاد: {new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold">موقعیت</h3>
              <div className="mt-2 space-y-2">
                <p>شهر: {order.city}</p>
                <p>طول جغرافیایی: {order.lng}</p>
                <p>عرض جغرافیایی: {order.lat}</p>
              </div>
              <div className="mt-4 h-[300px] w-full">
                <StaticMap
                  lng={parseFloat(order.lng)}
                  lat={parseFloat(order.lat)}
                  city={order.city}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 