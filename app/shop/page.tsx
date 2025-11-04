import Link from "next/link"
// import Image from "next/image"
import React from "react"

import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { SignIn } from "@phosphor-icons/react/dist/ssr"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

import {
  Box,
  Flex,
  Text,
  RadioCards
} from "@radix-ui/themes";

export default function Analytics() {
  return (
    <div className="px-2">
      <Card className="max-w-[600px] mx-auto my-4">
        <CardHeader>
          <CardTitle>سفارش یک</CardTitle>
          <CardDescription>با انتخاب آدرس دقیق، قیمت تمام شده دقیق محاسبه می گردد.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">آدرس شما</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">شیراز، پاسارگاد شمالی...</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>آدرس های منتخب</DialogTitle>
                      <DialogDescription>
                        لیست آدرس های منتخب شما
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* <div className="grid grid-cols-4 items-center gap-4"> */}
                      <div className="grid items-center">
                        {/* <Label htmlFor="one" className="text-right">
                          Name
                        </Label> */}
                        <Input
                          id="one"
                          defaultValue="شیراز، پاسارگاد شمالی"
                        // className="col-span-3"
                        />
                      </div>
                      {/* <div className="grid grid-cols-4 items-center gap-4"> */}
                      <div className="grid items-center">
                        {/* <Label htmlFor="two" className="text-right">
                          Username
                        </Label> */}
                        <Input
                          id="two"
                          defaultValue="بوشهر، میدان نخلستان"
                        // className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">انتخاب آدرس</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Text>
                کالا:
              </Text>
              <Box>
                {/* <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "2" }} dir="rtl"> */}
                <RadioCards.Root defaultValue="1" columns="2" dir="rtl">
                  <RadioCards.Item value="1">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">سیمان</Text>
                      <Text>پاکتی/ یا تناژ</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="2">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">پودر سنگ</Text>
                      <Text>پاکتی/ یا تناژ</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="3">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">ماسه</Text>
                      <Text>یک کامیون/ یا تناژ</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="4">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">آجر</Text>
                      <Text>یک کامیون/ یا تناژ</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="5">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">آب</Text>
                      <Text>تانکر</Text>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
              </Box>
              <Text>
                واحد:
              </Text>
              <Box>
                {/* <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "2" }} dir="rtl"> */}
                <RadioCards.Root defaultValue="1" columns="2" dir="rtl">
                  <RadioCards.Item value="1">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">پاکت</Text>
                      <Text>توضیحات بیشتر</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="2">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">تناژ</Text>
                      <Text>توضیحات بیشتر</Text>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
              </Box>
              {/* <!-- Input Number --> */}
              <div className="flex py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
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
                <span className="mr-4">پاکت</span>
              </div>
              {/* <!-- End Input Number --> */}
            </div>
          </form>
          {/* <div className="max-w-[600px] mx-auto mt-4 px-4"> */}
          <Flex direction="column" gap="3" maxWidth="600px" className="mx-auto pt-4">
            <Text>
              لیست فروش:
            </Text>
            <RadioCards.Root defaultValue="1" color="indigo" columns={{ initial: "1", sm: "1" }} dir="rtl">
              {/* <RadioCards.Root defaultValue="0" color="indigo" dir="rtl"> */}
              <RadioCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold">سیمان فارس - ۹۲۰۰۰ تومان</Text>
                  <Text>فروشگاه مصالح عباس پور</Text>
                </Flex>
              </RadioCards.Item>
              <RadioCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold">سیمان فارس - ۹۳۰۰۰ تومان</Text>
                  <Text>فروشگاه مصالح هاشمی</Text>
                </Flex>
              </RadioCards.Item>
              <RadioCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold">سیمان فیروزآباد - ۹۸۰۰۰ تومان</Text>
                  <Text>فروشگاه مصالح آریا</Text>
                </Flex>
              </RadioCards.Item>
            </RadioCards.Root>
          </Flex>
          {/* </div> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">لغو سفارش</Button>
          <Button>ثبت سفارش</Button>
        </CardFooter>
      </Card>
    </div>
  )
}