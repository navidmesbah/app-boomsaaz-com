import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSuppliersAction } from './actions';
import SuppliersList from './SuppliersList';

export default async function SuppliersPage() {
  const suppliers = await getSuppliersAction();

  return (
    <div className="h-full bg-gray-50">
      <div className="backdrop-blur-xl border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">فروشگاه‌ها</h1>
            <p className="mt-1 text-sm text-gray-500">
              مدیریت فروشگاه‌ها
            </p>
          </div>
          <Link href="/admin/settings/suppliers/new">
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              افزودن
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SuppliersList initialSuppliers={suppliers} />
        </div>
      </div>
    </div>
  );
} 