'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Supplier, User, TradingPair } from '@/lib/db/schema';
import {
  createSupplierAction,
  updateSupplierAction,
  deleteSupplierAction,
  getUsersAction,
  getTradingPairsAction,
  getSupplierTradingPairsAction,
  updateSupplierTradingPairsAction,
} from './actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, MapPin } from 'lucide-react';
import { MapModal } from '@/components/map-modal';

interface SupplierFormProps {
  supplier?: Supplier & { manager: User | null };
  tradingPairs?: TradingPair[];
}

export default function SupplierForm({ supplier, tradingPairs: initialTradingPairs }: SupplierFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [allTradingPairs, setAllTradingPairs] = useState<TradingPair[]>([]);
  const [selectedTradingPairs, setSelectedTradingPairs] = useState<TradingPair[]>(initialTradingPairs || []);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: supplier?.name ?? '',
    email: supplier?.email ?? '',
    phone: supplier?.phone ?? '',
    status: supplier?.status ?? 'active',
    managerId: supplier?.managerId ?? '',
    city: supplier?.city ?? '',
    lng: supplier?.lng ?? '',
    lat: supplier?.lat ?? '',
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsersAction();
        setUsers(users);
      } catch (error) {
        console.error('Failed to load users:', error);
        toast.error('خطا در بارگذاری کاربران');
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadTradingPairs = async () => {
      try {
        const pairs = await getTradingPairsAction();
        setAllTradingPairs(pairs);

        if (supplier?.id && !initialTradingPairs) {
          const supplierPairs = await getSupplierTradingPairsAction(supplier.id);
          setSelectedTradingPairs(supplierPairs);
        }
      } catch (error) {
        toast.error('دریافت کالاها با مشکل مواجه شد');
      }
    };

    loadTradingPairs();
  }, [supplier?.id, initialTradingPairs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (supplier) {
        await updateSupplierAction({ id: supplier.id, ...formData });
        await updateSupplierTradingPairsAction(supplier.id, selectedTradingPairs.map(pair => pair.id));
        toast.success('فروشگاه با موفقیت بروزرسانی شد');
      } else {
        const newSupplier = await createSupplierAction(formData);
        if (newSupplier.success && newSupplier.id) {
          await updateSupplierTradingPairsAction(newSupplier.id, selectedTradingPairs.map(pair => pair.id));
          toast.success('فروشگاه با موفقیت ایجاد شد');
        }
      }

      router.push('/admin/settings/suppliers');
    } catch (error) {
      toast.error(supplier ? 'خطا در بروزرسانی فروشگاه' : 'خطا در ایجاد فروشگاه');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!supplier) return;
    
    setIsDeleting(true);
    try {
      await deleteSupplierAction(supplier.id);
      toast.success('فروشگاه با موفقیت حذف شد');
      router.push('/admin/settings/suppliers');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete supplier:', error);
      toast.error('خطا در حذف فروشگاه');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTradingPairChange = (pairId: string) => {
    const pair = allTradingPairs.find(p => p.id === pairId);
    if (!pair) return;

    setSelectedTradingPairs(prev => {
      const isSelected = prev.some(p => p.id === pairId);
      if (isSelected) {
        return prev.filter(p => p.id !== pairId);
      } else {
        return [...prev, pair];
      }
    });
  };

  const handleLocationSelect = (location: { lat: number; lng: number; city: string }) => {
    setFormData({
      ...formData,
      lat: location.lat.toString(),
      lng: location.lng.toString(),
      city: location.city,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-2">
        <Label htmlFor="name">نام</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="نام فروشگاه را وارد کنید"
          required
          className="text-right"
          disabled={loading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="ایمیل فروشگاه را وارد کنید"
          required
          dir="ltr"
          className="text-left"
          disabled={loading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">شماره تماس</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="شماره تماس فروشگاه را وارد کنید"
          required
          className="text-right font-farsi"
          disabled={loading}
        />
      </div>
      {supplier && (
        <div className="grid gap-2">
          <Label htmlFor="status">وضعیت</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="inactive">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="manager">مدیر</Label>
        <Select
          value={formData.managerId}
          onValueChange={(value) =>
            setFormData({ ...formData, managerId: value })
          }
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="مدیر را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.phone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">موقعیت</Label>
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setIsMapModalOpen(true)}
          >
            انتخاب موقعیت روی نقشه
          </Button>
          {formData.city && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">شهر: {formData.city}</p>
              <p className="text-sm">عرض جغرافیایی: {formData.lat}</p>
              <p className="text-sm">طول جغرافیایی: {formData.lng}</p>
            </div>
          )}
          <input type="hidden" name="city" value={formData.city} />
          <input type="hidden" name="lat" value={formData.lat} />
          <input type="hidden" name="lng" value={formData.lng} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>کالاها</Label>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allTradingPairs.map((pair) => (
            <div key={pair.id} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={pair.id}
                checked={selectedTradingPairs.some(p => p.id === pair.id)}
                onCheckedChange={() => handleTradingPairChange(pair.id)}
              />
              <Label htmlFor={pair.id} className="text-sm">
                {pair.baseCurrency}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        {supplier && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
              >
                {isDeleting ? 'در حال حذف...' : 'حذف'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>آیا از حذف این فروشگاه اطمینان دارید؟</AlertDialogTitle>
                <AlertDialogDescription>
                  این عمل قابل بازگشت نیست. فروشگاه و تمام اطلاعات مرتبط با آن حذف خواهد شد.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/settings/suppliers')}
          disabled={loading || isDeleting}
        >
          انصراف
        </Button>
        <Button type="submit" disabled={loading || isDeleting}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : supplier ? (
            'ذخیره تغییرات'
          ) : (
            'ذخیره'
          )}
        </Button>
      </div>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={formData.city ? {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
          city: formData.city
        } : undefined}
      />
    </form>
  );
} 