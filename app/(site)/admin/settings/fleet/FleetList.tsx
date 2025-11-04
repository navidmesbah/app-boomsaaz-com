'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { User, Fleet } from '@/lib/db/schema';
import { getFleetsAction } from './actions';
import { toast } from 'sonner';

export default function FleetList() {
  const [fleets, setFleets] = useState<Array<Fleet & { manager: User | null }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFleets = async () => {
    try {
      const data = await getFleetsAction();
      setFleets(data);
    } catch (error) {
      console.error('Failed to load fleets:', error);
      toast.error('خطا در بارگذاری ناوگان‌ها');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFleets();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">در حال بارگذاری...</div>;
  }

  if (fleets.length === 0) {
    return <div className="p-4 text-center text-gray-500">هیچ ناوگانی یافت نشد</div>;
  }

  return (
    <div className="grid gap-2">
      {fleets.map((fleet) => (
        <Link
          key={fleet.id}
          href={`/admin/settings/fleet/${fleet.id}`}
          className="flex items-center justify-between p-3 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-medium">{fleet.name}</h2>
            {fleet.manager && (
              <span className="text-sm text-muted-foreground">
                {fleet.manager.phone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant={fleet.status === 'active' ? 'default' : 'secondary'}
              className="font-normal"
            >
              {fleet.status === 'active' ? 'فعال' : 'غیرفعال'}
            </Badge>
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
} 