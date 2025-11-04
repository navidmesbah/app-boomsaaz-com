'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

const NumberInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
        const [value, setValue] = React.useState(0);

        return (
            // <div className="flex py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
            <div className="flex flex-col gap-4 py-2 bg-white dark:bg-neutral-900" data-hs-input-number="">
                <div>حجم سفارش به {props.title}:</div>
                {/* <div className="flex items-center gap-x-1.5"> */}
                <div className="flex gap-x-1.5 mr-2">
                    {/* <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment=""> */}
                    <button onClick={() => setValue(value + 1)} type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment="">
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                    </button>
                    <input
                        dir="ltr"
                        type="number"
                        className={cn(
                            "max-h-6 p-0 w-16 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white",
                            className
                        )}
                        ref={ref}
                        {...props}
                        style={{ MozAppearance: "textfield" }}
                        aria-roledescription="Number field"
                        // defaultValue="0"
                        value={value}
                        onChange={e => setValue(Number(e.target.value))}
                        data-hs-input-number-input="" />
                    {/* <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement=""> */}
                    <button onClick={() => setValue(value - 1)} type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement="">
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
)
NumberInput.displayName = "Input"

export { NumberInput }