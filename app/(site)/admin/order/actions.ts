//@ts-nocheck
'use server'

import { saveBuyOrder, findBestsupplier as findBestsupplierQuery, getTradingPairs as getTradingPairsQuery, createBuyOrder as createBuyOrderQuery } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { auth } from '@/app/(auth)/auth'
import { db } from '@/lib/db'
import { tradingPair, buyOrder } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// import Kavenegar from 'kavenegar'

interface FindBestSupplierActionState {
  status: 'idle' | 'loading' | 'success' | 'error';
  suppliers?: any[];
}

export async function findBestsupplier(prevState: FindBestSupplierActionState, formData: FormData) {
  try {
    const buyerLng = formData.get('buyerLng');
    const buyerLat = formData.get('buyerLat');

    if (!buyerLng || !buyerLat) {
      return { status: 'error' };
    }

    const suppliers = await findBestsupplierQuery(buyerLng.toString(), buyerLat.toString());
    return { status: 'success', suppliers };
  } catch (error) {
    console.error('Failed to find best supplier:', error);
    return { status: 'error' };
  }
}

export async function create(lng: number, lat: number, formData: FormData) {
    const rawFormData = {
        // customerId: formData.get('customerId'),
        city: formData.get('city'),
        volume: formData.get('volume'),
    }

    // console.log("action trigger", rawFormData)

    // const api = Kavenegar.KavenegarApi({
    //     apikey: '547342785157514772306E61466730654B586351486C7561516670542F622B5852634D64756C71615455303D'
    // });

    // await api.VerifyLookup({
    //     receptor: "09128847076",
    //     token: "1234",
    //     template: "verification"
    // }, function(response, status) {
    //     console.log(response);
    //     console.log(status);
    // });

    const session = await auth();

    // console.log("session user", session.user)

    if (!session || !session.user) {
        return;
    }

    // if (session.user.id !== chat.userId) {
    //     return notFound();
    // }

    await saveBuyOrder({
        userId: session?.user?.id,
        tradingPairId: "2bca4b60-1c6b-423a-b181-4a01cbddf0ea",
        locationId: "579f3ab4-ea21-4e71-b73a-64b05aea9a75",
        side: 'b',
        price: '90000',
        city: rawFormData.city?.toString() || "IRAN",
        lng: lng.toString(),
        lat: lat.toString(),
        unit: "پاکت",
        volume: rawFormData.volume?.toString() || "0",
        status: "پرداخت شده"
    })

    redirect(`/customer/order3`) // Navigate to the new post page
}

export async function getTradingPairs() {
  return await getTradingPairsQuery()
}

export async function createBuyOrder(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }

  const tradingPairId = formData.get('tradingPairId')?.toString()
  const volume = formData.get('volume')?.toString()
  const price = formData.get('price')?.toString()
  const unit = formData.get('unit')?.toString()
  const city = formData.get('city')?.toString()
  const lng = formData.get('lng')?.toString()
  const lat = formData.get('lat')?.toString()

  if (!tradingPairId || !volume || !price || !unit || !city || !lng || !lat) {
    console.error('Missing required fields:', { tradingPairId, volume, price, unit, city, lng, lat })
    return { error: 'Missing required fields' }
  }

  try {
    await createBuyOrderQuery(
      session.user.id,
      tradingPairId,
      price,
      volume,
      unit,
      city,
      Number(lng),
      Number(lat)
    )

    revalidatePath('/customer/order3')
    return { success: true }
  } catch (error) {
    console.error('Error creating buy order:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create buy order' }
  }
}
