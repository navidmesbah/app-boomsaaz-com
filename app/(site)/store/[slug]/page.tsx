import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getTradingPairById } from '@/lib/db/queries';
import { ProductImage } from '../components/ProductImage';

export const revalidate = 3600; // Revalidate every hour

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const tradingPair = await getTradingPairById(params.slug);

  if (!tradingPair) {
    notFound();
  }

  // Use the imageUrl if available, otherwise fall back to the default path
  const imageSrc = tradingPair.imageUrl || `/images/products/${tradingPair.baseCurrency.toLowerCase()}.jpg`;
  const fallbackSrc = `/images/products/${tradingPair.baseCurrency.toLowerCase()}.jpg`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full">
          <ProductImage
            src={imageSrc}
            alt={tradingPair.baseCurrency}
            fallbackSrc={fallbackSrc}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{tradingPair.baseCurrency}</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-600">قیمت:</span>
              <span className="font-bold">{tradingPair.price.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-600">واحد:</span>
              <span className="font-bold">{tradingPair.unit}</span>
            </div>
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href={`/customer/order?pair=${tradingPair.id}`}>
              ثبت سفارش خرید
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 