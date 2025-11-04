'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, UserRole } from '@/lib/db/schema';
import { toast } from 'sonner';
import { updateRole } from './actions';
import { useRouter } from 'next/navigation';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      setLoading(userId);
      const result = await updateRole(userId, newRole);
      
      if (result.success) {
        toast.success('User role updated successfully');
        router.refresh(); // Refresh the page to show updated data
      } else {
        toast.error(result.error || 'Failed to update user role');
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-mono">{user.id}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email || '-'}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                  disabled={loading === user.id}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 