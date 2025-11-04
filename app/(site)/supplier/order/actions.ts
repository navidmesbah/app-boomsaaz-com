//@ts-nocheck
'use server'

import { auth } from '@/app/(auth)/auth'
import { getSupplierByManagerId, createSupplierSellOrder } from '@/lib/db/queries'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// import Kavenegar from 'kavenegar'

export async function getSupplierData() {
  const session = await auth()
  if (!session?.user?.id) return null

  return await getSupplierByManagerId(session.user.id)
}

export async function createSellOrder(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }

  const supplier = await getSupplierByManagerId(session.user.id)
  if (!supplier) {
    return { error: 'Supplier not found' }
  }

  const tradingPairId = formData.get('tradingPairId')?.toString()
  const volume = formData.get('volume')?.toString()
  const price = formData.get('price')?.toString()
  const unit = formData.get('unit')?.toString()
  const city = formData.get('city')?.toString()
  const lng = formData.get('lng')?.toString()
  const lat = formData.get('lat')?.toString()

  if (!tradingPairId || !volume || !price || !unit) {
    return { error: 'Missing required fields' }
  }

  try {
    await createSupplierSellOrder(
      supplier.supplier.id,
      tradingPairId,
      price,
      volume,
      unit,
      city,
      lng ? Number(lng) : undefined,
      lat ? Number(lat) : undefined
    )

    return { success: true }
  } catch (error) {
    console.error('Error creating sell order:', error)
    return { error: 'Failed to create sell order' }
  }
}
