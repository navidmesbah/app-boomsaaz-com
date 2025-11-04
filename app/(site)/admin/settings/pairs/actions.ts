'use server';

import { revalidatePath } from 'next/cache';
import { getTradingPairs, createTradingPair, updateTradingPair, deleteTradingPair } from '@/lib/db/queries';

export async function getTradingPairsAction() {
  try {
    return await getTradingPairs();
  } catch (error) {
    console.error('Failed to fetch trading pairs:', error);
    throw error;
  }
}

export async function createTradingPairAction(data: {
  baseCurrency: string;
  price: string;
  type: string;
  unit: string;
  imageUrl?: string;
}) {
  try {
    await createTradingPair(data);
    revalidatePath('/admin/settings/pairs');
    return { success: true };
  } catch (error) {
    console.error('Failed to create trading pair:', error);
    return { success: false };
  }
}

export async function updateTradingPairAction({
  id,
  baseCurrency,
  price,
  type,
  unit,
  imageUrl,
}: {
  id: string;
  baseCurrency: string;
  price: string;
  type: string;
  unit: string;
  imageUrl?: string;
}) {
  try {
    await updateTradingPair({ id, baseCurrency, price, type, unit, imageUrl });
    revalidatePath('/admin/settings/pairs');
    return { success: true };
  } catch (error) {
    console.error('Failed to update trading pair:', error);
    throw error;
  }
}

export async function deleteTradingPairAction(id: string) {
  try {
    await deleteTradingPair(id);
    revalidatePath('/admin/settings/pairs');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete trading pair:', error);
    throw error;
  }
} 