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
import type { Fleet, User } from '@/lib/db/schema';
import { createFleetAction, updateFleetAction, deleteFleetAction, getUsersAction } from './actions';

interface FleetFormProps {
  fleet?: Fleet & { manager: User | null };
}

export default function FleetForm({ fleet }: FleetFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [formData, setFormData] = useState({
    name: fleet?.name ?? '',
    status: fleet?.status ?? 'active',
    managerId: fleet?.managerId ?? '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (fleet) {
        await updateFleetAction({ id: fleet.id, ...formData });
        toast.success('ناوگان با موفقیت بروزرسانی شد');
      } else {
        await createFleetAction(formData);
        toast.success('ناوگان با موفقیت ایجاد شد');
      }
      router.push('/admin/settings/fleet');
      router.refresh();
    } catch (error) {
      console.error('Error saving fleet:', error);
      toast.error(fleet ? 'خطا در بروزرسانی ناوگان' : 'خطا در ایجاد ناوگان');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!fleet) return;
    
    setIsDeleting(true);
    try {
      await deleteFleetAction(fleet.id);
      toast.success('ناوگان با موفقیت حذف شد');
      router.push('/admin/settings/fleet');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete fleet:', error);
      toast.error('خطا در حذف ناوگان');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">نام</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="نام ناوگان را وارد کنید"
          required
          className="text-right"
          disabled={isSubmitting}
        />
      </div>
      {fleet && (
        <div className="grid gap-2">
          <Label htmlFor="status">وضعیت</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
            disabled={isSubmitting}
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
          disabled={isSubmitting}
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
      <div className="flex justify-end gap-4">
        {fleet && (
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
                <AlertDialogTitle>آیا از حذف این ناوگان اطمینان دارید؟</AlertDialogTitle>
                <AlertDialogDescription>
                  این عمل قابل بازگشت نیست. ناوگان و تمام اطلاعات مرتبط با آن حذف خواهد شد.
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
          onClick={() => router.push('/admin/settings/fleet')}
          disabled={isSubmitting || isDeleting}
        >
          انصراف
        </Button>
        <Button type="submit" disabled={isSubmitting || isDeleting}>
          {isSubmitting ? 'در حال ذخیره...' : fleet ? 'ذخیره تغییرات' : 'ذخیره'}
        </Button>
      </div>
    </form>
  );
} 