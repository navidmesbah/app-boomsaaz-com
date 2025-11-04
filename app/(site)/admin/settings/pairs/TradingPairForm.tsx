'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
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
import { Loader2 } from 'lucide-react';
import type { TradingPair } from './types';
import { createTradingPairAction, updateTradingPairAction, deleteTradingPairAction } from './actions';
import { ProductImage } from '@/app/(site)/store/components/ProductImage';

const TYPE_OPTIONS = [
  { value: 'سیمان', label: 'سیمان' },
  { value: 'ماسه', label: 'ماسه' },
  { value: 'دیگر', label: 'دیگر' },
] as const;

const UNIT_OPTIONS = [
  { value: 'کیسه', label: 'کیسه' },
  { value: 'کامیون', label: 'کامیون' },
  { value: 'بدون واحد', label: 'بدون واحد' },
] as const;

interface TradingPairFormProps {
  tradingPair?: TradingPair;
}

export default function TradingPairForm({ tradingPair }: TradingPairFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    baseCurrency: tradingPair?.baseCurrency ?? '',
    price: tradingPair?.price ?? '',
    type: tradingPair?.type ?? TYPE_OPTIONS[0].value,
    unit: tradingPair?.unit ?? UNIT_OPTIONS[0].value,
    imageUrl: tradingPair?.imageUrl ?? '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (tradingPair) {
        await updateTradingPairAction({
          id: tradingPair.id,
          baseCurrency: formData.baseCurrency,
          price: formData.price,
          type: formData.type,
          unit: formData.unit,
          imageUrl: formData.imageUrl,
        });
        toast.success('کالا با موفقیت به‌روزرسانی شد');
      } else {
        await createTradingPairAction({
          baseCurrency: formData.baseCurrency,
          price: formData.price,
          type: formData.type,
          unit: formData.unit,
          imageUrl: formData.imageUrl,
        });
        toast.success('کالا با موفقیت ایجاد شد');
      }

      router.push('/admin/settings/pairs');
    } catch (error) {
      toast.error(tradingPair ? 'خطا در به‌روزرسانی کالا' : 'خطا در ایجاد کالا');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!tradingPair) return;
    
    setIsDeleting(true);
    try {
      await deleteTradingPairAction(tradingPair.id);
      toast.success('کالا با موفقیت حذف شد');
      router.push('/admin/settings/pairs');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete trading pair:', error);
      toast.error('خطا در حذف کالا');
    } finally {
      setIsDeleting(false);
    }
  };

  // Default fallback image
  const fallbackImage = formData.baseCurrency 
    ? `/images/products/${formData.baseCurrency.toLowerCase()}.jpg` 
    : '/images/placeholder.jpg';

  // Determine the image source for preview
  const imageSrc = formData.imageUrl || fallbackImage;

  console.log('Trading Pair:', tradingPair);
  console.log('Image URL:', formData.imageUrl);
  console.log('Image Source:', imageSrc);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-2">
        <Label htmlFor="baseCurrency">کالا</Label>
        <Input
          id="baseCurrency"
          value={formData.baseCurrency}
          onChange={(e) =>
            setFormData({ ...formData, baseCurrency: e.target.value })
          }
          placeholder="نام کالا را وارد کنید"
          required
          className="text-right"
          disabled={loading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">نوع</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
          disabled={loading}
        >
          <SelectTrigger className="text-right">
            <SelectValue placeholder="نوع را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="unit">واحد</Label>
        <Select
          value={formData.unit}
          onValueChange={(value) => setFormData({ ...formData, unit: value })}
          disabled={loading}
        >
          <SelectTrigger className="text-right">
            <SelectValue placeholder="واحد را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">قیمت</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          placeholder="قیمت را وارد کنید"
          required
          className="text-left"
          disabled={loading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="imageUrl">آدرس تصویر</Label>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full h-48 border rounded-md overflow-hidden">
            <ProductImage
              src={imageSrc}
              alt="Preview"
              fallbackSrc={fallbackImage}
              className="object-cover"
              fill
            />
          </div>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="آدرس تصویر را وارد کنید"
            className="text-left"
            dir="ltr"
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {tradingPair && (
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
                <AlertDialogTitle>آیا از حذف این کالا اطمینان دارید؟</AlertDialogTitle>
                <AlertDialogDescription>
                  این عمل قابل بازگشت نیست. کالا و تمام اطلاعات مرتبط با آن حذف خواهد شد.
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
          onClick={() => router.push('/admin/settings/pairs')}
          disabled={loading || isDeleting}
        >
          انصراف
        </Button>
        <Button type="submit" disabled={loading || isDeleting}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : tradingPair ? (
            'ذخیره تغییرات'
          ) : (
            'ذخیره'
          )}
        </Button>
      </div>
    </form>
  );
} 