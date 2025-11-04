'use server';

import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
  getUsers,
  getTradingPairs,
  getSupplierTradingPairs,
  updateSupplierTradingPairs as updateSupplierTradingPairsQuery
} from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function getSuppliersAction() {
  try {
    return await getSuppliers();
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
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

export async function createSupplierAction(data: {
  name: string;
  email: string;
  phone: string;
  status: string;
  managerId?: string;
  city?: string;
  lng?: string;
  lat?: string;
}): Promise<{ success: boolean; id?: string }> {
  try {
    const result = await createSupplier(data);
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error creating supplier:', error);
    return { success: false };
  }
}

export async function updateSupplierAction({
  id,
  name,
  email,
  phone,
  status,
  managerId,
  city,
  lng,
  lat,
}: {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  managerId: string;
  city?: string;
  lng?: string;
  lat?: string;
}) {
  try {
    await updateSupplier({
      id,
      name,
      email,
      phone,
      status,
      managerId,
      city,
      lng,
      lat,
    });
    revalidatePath('/admin/settings/suppliers');
    return { success: true };
  } catch (error) {
    console.error('Failed to update supplier:', error);
    throw error;
  }
}

export async function deleteSupplierAction(id: string) {
  try {
    await deleteSupplier(id);
    revalidatePath('/admin/settings/suppliers');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete supplier:', error);
    throw error;
  }
}

export async function getTradingPairsAction() {
  try {
    return await getTradingPairs();
  } catch (error) {
    console.error('Failed to fetch trading pairs:', error);
    throw error;
  }
}

export async function getSupplierTradingPairsAction(supplierId: string) {
  try {
    return await getSupplierTradingPairs(supplierId);
  } catch (error) {
    console.error('Failed to fetch supplier trading pairs:', error);
    throw error;
  }
}

export async function updateSupplierTradingPairsAction(supplierId: string, tradingPairIds: string[]) {
  try {
    await updateSupplierTradingPairsQuery(supplierId, tradingPairIds);
    revalidatePath('/admin/settings/suppliers');
    return { success: true };
  } catch (error) {
    console.error('Failed to update supplier trading pairs:', error);
    throw error;
  }
} 