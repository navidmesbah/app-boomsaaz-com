'use server'

import { updateLocation } from '@/lib/db/queries';
import { redirect } from 'next/navigation'

export async function create(lng: number, lat: number, formData: FormData) {
    const rawFormData = {
        // customerId: formData.get('customerId'),
        city: formData.get('city'),
    }

    console.log("action trigger", rawFormData)

    await updateLocation({
        id: "579f3ab4-ea21-4e71-b73a-64b05aea9a75",
        city: rawFormData.city?.toString() || "IRAN",
        lng: lng.toString(),
        lat: lat.toString(),
    })

    redirect(`/customer/edit`) // Navigate to the new post page
}