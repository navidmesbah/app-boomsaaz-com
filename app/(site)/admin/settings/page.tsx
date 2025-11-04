import Link from "next/link"
import React from "react"

import { Separator } from "@/components/ui/separator"
// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export default function Analytics() {
  return (
    <div>
      <Link
        href="/admin/settings/pairs"
        key={0}
        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {/* <div className="flex w-full items-center gap-2">
          <span>name</span>{" "}
          <span className="ml-auto text-xs">date</span>
          </div> */}
        <span className="font-medium">کالاها</span>
        {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
          teaser
          </span> */}
      </Link>
      <Link
        href="/admin/settings/suppliers"
        key={1}
        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {/* <div className="flex w-full items-center gap-2">
          <span>name</span>{" "}
          <span className="ml-auto text-xs">date</span>
          </div> */}
        <span className="font-medium">فروشگاه‌ها</span>
        {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
          teaser
          </span> */}
      </Link>
      <Link
        href="/admin/settings/fleet"
        key={2}
        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {/* <div className="flex w-full items-center gap-2">
          <span>name</span>{" "}
          <span className="ml-auto text-xs">date</span>
          </div> */}
        <span className="font-medium">ناوگان‌ها</span>
        {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
          teaser
          </span> */}
      </Link>
      {/* <Separator className="my-2" /> */}
      <Link
        href="/admin/settings/users"
        key={3}
        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {/* <div className="flex w-full items-center gap-2">
          <span>name</span>{" "}
          <span className="ml-auto text-xs">date</span>
          </div> */}
        <span className="font-medium">کاربران</span>
        {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
          teaser
          </span> */}
      </Link>
    </div>
  )
}
