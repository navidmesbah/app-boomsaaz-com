import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSupplier } from '@/lib/db/queries';
import SupplierForm from '../SupplierForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditSupplierPage({ params }: PageProps) {
  const [supplier] = await getSupplier(params.id);
  
  if (!supplier) {
    notFound();
  }

  return (
    <div className="h-full bg-gray-50" dir="rtl">
      {/* iOS-style header */}
      <div className="backdrop-blur-xl border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/settings/suppliers">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">ویرایش فروشگاه</h1>
              <p className="mt-1 text-sm text-gray-500">
                اطلاعات فروشگاه را ویرایش کنید
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <SupplierForm supplier={supplier} />
        </div>
      </div>
    </div>
  );
} 