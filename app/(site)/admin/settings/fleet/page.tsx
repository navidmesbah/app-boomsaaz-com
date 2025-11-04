import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FleetList from './FleetList';

export default function FleetPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">ناوگان‌ها</h1>
        <Link href="/admin/settings/fleet/new">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            افزودن ناوگان
          </Button>
        </Link>
      </div>
      <FleetList />
    </div>
  );
} 