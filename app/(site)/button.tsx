'use client'

import { signOut } from 'next-auth/react';

// import Link from 'next/link'
// import { useFormStatus } from 'react-dom'
// import { Button } from '@/components/ui/button'

// import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function SubmitButton() {
    // const { pending } = useFormStatus()

    return (
        <span
            onClick={() => {
                signOut({
                    redirectTo: '/',
                });
            }}
            className="cursor-pointer text-muted-foreground"
        >
            خروج
        </span>
    )
}