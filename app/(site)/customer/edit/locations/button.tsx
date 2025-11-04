'use client'

// import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type="submit">
            {pending ? "در حال پردازش" : "ذخیره"}
            {/* <Link href="/customer">
                {pending ? "در حال پردازش" : "پیگیری سفارش"}
            </Link> */}
        </Button>
    )
}