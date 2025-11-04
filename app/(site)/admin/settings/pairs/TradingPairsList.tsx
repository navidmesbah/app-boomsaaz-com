'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { TradingPair } from './types';
import { getTradingPairsAction } from './actions';
import { ProductImage } from '@/app/(site)/store/components/ProductImage';

interface TradingPairsListProps {
  initialTradingPairs: TradingPair[];
}

export default function TradingPairsList({ initialTradingPairs }: TradingPairsListProps) {
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>(initialTradingPairs);
  const [loading, setLoading] = useState(false);

  const refreshTradingPairs = async () => {
    setLoading(true);
    try {
      const updatedTradingPairs = await getTradingPairsAction();
      setTradingPairs(updatedTradingPairs);
    } catch (error) {
      console.error('Failed to refresh trading pairs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return !isNaN(numericPrice) ? numericPrice.toLocaleString('fa-IR') : price;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">کالاها</h1>
        <Link href="/admin/settings/pairs/new">
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            افزودن کالا
          </Button>
        </Link>
      </div>

      <div className="divide-y rounded-md border">
        {tradingPairs.length === 0 ? (
          <p className="p-4 text-center text-muted-foreground">
            هیچ کالا یافت نشد
          </p>
        ) : (
          tradingPairs.map((pair) => {
            // Use the imageUrl if available, otherwise fall back to the default path
            const imageSrc = pair.imageUrl || `/images/products/${pair.baseCurrency.toLowerCase()}.jpg`;
            const fallbackSrc = `/images/products/${pair.baseCurrency.toLowerCase()}.jpg`;
            
            return (
              <Link
                key={pair.id}
                href={`/admin/settings/pairs/${pair.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <ProductImage
                      src={imageSrc}
                      alt={pair.baseCurrency}
                      fallbackSrc={fallbackSrc}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{pair.baseCurrency}</p>
                    <p className="text-sm text-muted-foreground">
                      نوع: {pair.type}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      قیمت: {formatPrice(pair.price)} تومان / {pair.unit}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
} 