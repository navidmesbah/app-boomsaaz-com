'use server';

import { updateUserRole } from '@/lib/db/queries';
import { UserRole } from '@/lib/db/schema';
import { auth } from '@/app/(auth)/auth';

export async function updateRole(userId: string, role: UserRole) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    throw new Error('Unauthorized');
  }

  try {
    await updateUserRole({ id: userId, role });
    return { success: true };
  } catch (error) {
    console.error('Failed to update user role:', error);
    return { success: false, error: 'Failed to update user role' };
  }
} 