import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { TradingPair } from "@/lib/db/schema"
import { ProductImage } from "./ProductImage"

interface TradingPairCardProps {
  tradingPair: TradingPair
}

export function TradingPairCard({ tradingPair }: TradingPairCardProps) {
  // Use the imageUrl if available, otherwise fall back to the default path
  const imageSrc = tradingPair.imageUrl || `/images/products/${tradingPair.baseCurrency.toLowerCase()}.jpg`;
  const fallbackSrc = `/images/products/${tradingPair.baseCurrency.toLowerCase()}.jpg`;
  
  return (
    <Link href={`/store/${tradingPair.id}`} className="block">
      <Card className="overflow-hidden group transition-transform duration-200 hover:scale-105">
        <div className="relative h-48 w-full">
          <ProductImage
            src={imageSrc}
            alt={tradingPair.baseCurrency}
            fallbackSrc={fallbackSrc}
            className="object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{tradingPair.baseCurrency}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">قیمت:</span>
              <span className="font-medium">{tradingPair.price.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">واحد:</span>
              <span className="font-medium">{tradingPair.unit}</span>
            </div>
            <Button className="w-full mt-4">
              مشاهده جزئیات
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 