//@ts-nocheck
'use server'

import { saveBuyOrder, findBestsupplier as findBestsupplierQuery, getTradingPairs as getTradingPairsQuery, createBuyOrder as createBuyOrderQuery, getBuyOrderByAuthority, updateBuyOrderStatusByAuthority } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { auth } from '@/app/(auth)/auth'
import { db } from '@/lib/db'
import { tradingPair, buyOrder } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from "zod"
import { ZarinPal } from 'zarinpal-node-sdk';

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
  try {
    return await getTradingPairsQuery()
  } catch (error) {
    console.error("Error fetching trading pairs:", error)
    return []
  }
}

// Schema for creating a buy order
const createBuyOrderSchema = z.object({
  tradingPairId: z.string(),
  volume: z.number().min(1),
  price: z.number().min(0),
  unit: z.string(),
  city: z.string(),
  lat: z.number(),
  lng: z.number(),
})

// Function to create a buy order
export async function createBuyOrder(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }

  try {
    const tradingPairId = formData.get("tradingPairId") as string
    const volume = parseInt(formData.get("volume") as string)
    const price = parseInt(formData.get("price") as string)
    const unit = formData.get("unit") as string
    const city = formData.get("city") as string
    const lat = parseFloat(formData.get("lat") as string)
    const lng = parseFloat(formData.get("lng") as string)

    // Validate the data
    const validatedData = createBuyOrderSchema.parse({
      tradingPairId,
      volume,
      price,
      unit,
      city,
      lat,
      lng,
    })

    // Insert the order into the database
    await createBuyOrderQuery(
      session.user.id,
      validatedData.tradingPairId,
      validatedData.price,
      validatedData.volume,
      validatedData.unit,
      validatedData.city,
      validatedData.lng,
      validatedData.lat
    )

    revalidatePath("/customer/order3")
    return { success: true }
  } catch (error) {
    console.error("Error creating buy order:", error)
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data" }
    }
    return { error: "Failed to create buy order" }
  }
}

// Interface for order data
interface OrderData {
  tradingPairId: string
  volume: number
  price: number
  unit: string
  city: string
  lat: number
  lng: number
  amount: number
  description: string
}

// Function to initiate Zarinpal payment
export async function initiateZarinpalPayment(orderData: OrderData) {
  try {
    // Get the Zarinpal merchant ID from environment variables
    const merchantId = process.env.Zarinpal
    
    if (!merchantId) {
      console.error("Zarinpal merchant ID is not configured")
      return { error: "پرداخت در حال حاضر در دسترس نیست" }
    }
    
    // Create a callback URL for after payment
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const callbackUrl = `${baseUrl}/customer/payment-verification`
    
    // Determine if we should use sandbox mode
    // In production, we should use the real Zarinpal gateway
    const isSandbox = process.env.NODE_ENV !== 'production'
    
    // Convert amount from Toman to Rial for Zarinpal (multiply by 10)
    const amountInRial = orderData.amount * 10
    
    console.log("Initiating Zarinpal payment with data:", {
      merchantId,
      amount: amountInRial, // Amount in Rials
      description: orderData.description,
      callbackUrl: callbackUrl,
      isSandbox: isSandbox
    });
    
    // Initialize Zarinpal SDK
    const zarinpal = new ZarinPal({
      merchantId: merchantId,
      sandbox: isSandbox,
    });
    
    // Create payment request using the SDK
    const response = await zarinpal.payments.create({
      amount: amountInRial, // Amount in Rials
      callback_url: callbackUrl,
      description: orderData.description,
      metadata: {
        orderId: orderData.tradingPairId,
        volume: orderData.volume,
        city: orderData.city,
      }
    });
    
    console.log("Zarinpal payment response:", response);
    
    if (response.data && response.data.code === 100) {
      // Payment request was successful
      const authority = response.data.authority;
      
      // Create the order in the database with the authority code
      const session = await auth();
      if (!session?.user?.id) {
        return { error: 'Unauthorized' };
      }

      // Create the order with the authority code
      await createBuyOrderQuery(
        session.user.id,
        orderData.tradingPairId,
        orderData.price.toString(),
        orderData.volume.toString(),
        orderData.unit,
        orderData.city,
        orderData.lng,
        orderData.lat,
        authority // Pass the authority code
      );
      
      // Manually construct the redirect URL based on whether we're in sandbox mode or not
      let redirectUrl;
      if (isSandbox) {
        redirectUrl = `https://sandbox.zarinpal.com/pg/StartPay/${authority}`;
      } else {
        redirectUrl = `https://www.zarinpal.com/pg/StartPay/${authority}`;
      }
      
      return { authority, redirectUrl };
    } else {
      // Payment request failed
      console.error("Zarinpal payment request failed:", response.errors)
      return { error: "خطا در ایجاد درگاه پرداخت" }
    }
  } catch (error) {
    console.error("Error initiating Zarinpal payment:", error)
    return { error: "خطا در پردازش پرداخت" }
  }
}

// Function to verify Zarinpal payment
export async function verifyZarinpalPayment(authority: string, status: string) {
  try {
    // Get the Zarinpal merchant ID from environment variables
    const merchantId = process.env.Zarinpal
    
    if (!merchantId) {
      console.error("Zarinpal merchant ID is not configured")
      return { error: "پرداخت در حال حاضر در دسترس نیست" }
    }
    
    // Check if the payment was successful
    if (status !== 'OK') {
      return { error: "تراکنش لغو شده یا ناموفق بوده است" }
    }
    
    // Determine if we should use sandbox mode
    // In production, we should use the real Zarinpal gateway
    const isSandbox = process.env.NODE_ENV !== 'production'
    
    // Initialize Zarinpal SDK
    const zarinpal = new ZarinPal({
      merchantId: merchantId,
      sandbox: isSandbox,
    });
    
    // Get the order details from the database using the authority code
    const order = await getBuyOrderByAuthority(authority);
    
    if (!order) {
      console.error("Order not found for authority:", authority);
      return { error: "سفارش یافت نشد" };
    }
    
    // Calculate amount in Toman and convert to Rials for Zarinpal
    const amountInToman = parseInt(order.price) * parseInt(order.volume);
    const amountInRial = amountInToman * 10;
    
    try {
      console.log(`Verifying payment with authority: ${authority}, amount in Toman: ${amountInToman}, amount in Rial: ${amountInRial}`);
      
      // Verify payment using the SDK with amount in Rials
      const response = await zarinpal.verifications.verify({
        amount: amountInRial,
        authority: authority,
      });
      
      console.log("Verification response:", response);
      
      if (response.data.code === 100) {
        // Payment was successful
        console.log('Payment Verified:');
        console.log('Reference ID:', response.data.ref_id);
        console.log('Card PAN:', response.data.card_pan);
        console.log('Fee:', response.data.fee);
        
        // Update the order status in the database
        await updateBuyOrderStatusByAuthority(authority, "پرداخت شده");
        
        return { success: true, refId: response.data.ref_id }
      } else if (response.data.code === 101) {
        // Payment already verified
        console.log('Payment already verified.');
        return { success: true, refId: response.data.ref_id }
      } else {
        // Payment verification failed
        console.error("Zarinpal payment verification failed with code:", response.data.code)
        return { error: "خطا در تایید پرداخت" }
      }
    } catch (error) {
      console.error('Payment Verification Failed:', error);
      return { error: "خطا در تایید پرداخت" }
    }
  } catch (error) {
    console.error("Error verifying Zarinpal payment:", error)
    return { error: "خطا در پردازش تایید پرداخت" }
  }
}
