'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getSuppliersAction } from './actions';
import { toast } from 'sonner';
import type { SupplierWithManager } from './types';

interface SuppliersListProps {
  initialSuppliers: SupplierWithManager[];
}

export default function SuppliersList({ initialSuppliers }: SuppliersListProps) {
  const [suppliers, setSuppliers] = useState<SupplierWithManager[]>(initialSuppliers);
  const [isLoading, setIsLoading] = useState(false);

  const loadSuppliers = async () => {
    setIsLoading(true);
    try {
      const data = await getSuppliersAction();
      setSuppliers(data);
    } catch (error) {
      console.error('Failed to load suppliers:', error);
      toast.error('خطا در بارگذاری فروشگاه‌ها');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">در حال بارگذاری...</div>;
  }

  if (suppliers.length === 0) {
    return <div className="p-4 text-center text-gray-500">هیچ فروشگاه‌ای یافت نشد</div>;
  }

  return (
    <div className="divide-y divide-gray-100">
      {suppliers.map((supplier) => (
        <Link
          key={supplier.id}
          href={`/admin/settings/suppliers/${supplier.id}`}
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-medium">{supplier.name}</h2>
            {supplier.manager && (
              <span className="text-sm text-muted-foreground">
                {supplier.manager.phone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant={supplier.status === 'active' ? 'default' : 'secondary'}
              className="font-normal"
            >
              {supplier.status === 'active' ? 'فعال' : 'غیرفعال'}
            </Badge>
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
} 