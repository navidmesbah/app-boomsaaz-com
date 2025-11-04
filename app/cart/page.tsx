import Link from "next/link"
// import Image from "next/image"
import React from "react"

import { Button } from "@/components/ui/button"
// import { SignIn } from "@phosphor-icons/react/dist/ssr"

export default function Analytics() {
  return (
    <>
      <ul className="flex flex-col justify-end text-start -space-y-px max-w-[600px] mx-auto mt-4 px-4">
        <li className="flex items-center gap-x-2 p-3 text-sm bg-white border-0 text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
          <div className="w-full flex justify-between truncate">
            <span className="me-3 flex-1 w-0 truncate">
              سیمان خوزستان
            </span>
            {/* <!-- Input Number --> */}
            <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
              <div className="flex items-center gap-x-1.5">
                <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Decrease" data-hs-input-number-decrement="">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <input className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" style={{ MozAppearance: "textfield" }} type="number" aria-roledescription="Number field" defaultValue="0" data-hs-input-number-input="" />
                <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Increase" data-hs-input-number-increment="">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* <!-- End Input Number --> */}
          </div>
        </li>
        <li className="flex items-center gap-x-2 p-3 text-sm bg-white border-0 text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
          <div className="w-full flex justify-between truncate">
            <span className="me-3 flex-1 w-0 truncate">
              ماسه
            </span>
            {/* <!-- Input Number --> */}
            <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
              <div className="flex items-center gap-x-1.5">
                <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Decrease" data-hs-input-number-decrement="">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <input className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" style={{ MozAppearance: "textfield" }} type="number" aria-roledescription="Number field" defaultValue="0" data-hs-input-number-input="" />
                <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Increase" data-hs-input-number-increment="">
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* <!-- End Input Number --> */}
          </div>
        </li>
      </ul>
      <div className="max-w-[600px] mx-auto mt-4 px-4">
        <Button className="w-full" asChild>
          <Link href="/express">ادامه</Link>
        </Button>
      </div>
    </>
  )
}