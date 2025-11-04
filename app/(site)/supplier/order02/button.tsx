'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button variant="destructive" disabled={pending} type="submit">
            {pending ? "در حال پردازش" : "سفارش فروش"}
        </Button>
    )
}