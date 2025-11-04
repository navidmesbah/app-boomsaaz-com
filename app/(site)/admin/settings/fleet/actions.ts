'use server';

import { createFleet, updateFleet, deleteFleet, getFleets, getUsers } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function getFleetsAction() {
  try {
    return await getFleets();
  } catch (error) {
    console.error('Failed to fetch fleets:', error);
    throw error;
  }
}

export async function getUsersAction() {
  try {
    return await getUsers();
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

export async function createFleetAction({
  name,
  managerId,
}: {
  name: string;
  managerId: string;
}) {
  try {
    await createFleet({
      name,
      managerId,
    });
    revalidatePath('/admin/settings/fleet');
    return { success: true };
  } catch (error) {
    console.error('Failed to create fleet:', error);
    throw error;
  }
}

export async function updateFleetAction({
  id,
  name,
  status,
  managerId,
}: {
  id: string;
  name: string;
  status: string;
  managerId: string;
}) {
  try {
    await updateFleet({
      id,
      name,
      status,
      managerId,
    });
    revalidatePath('/admin/settings/fleet');
    return { success: true };
  } catch (error) {
    console.error('Failed to update fleet:', error);
    throw error;
  }
}

export async function deleteFleetAction(id: string) {
  try {
    await deleteFleet(id);
    revalidatePath('/admin/settings/fleet');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete fleet:', error);
    throw error;
  }
} 