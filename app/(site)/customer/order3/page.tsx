// "use client"

import React from "react"
import Link from "next/link"
// import Image from "next/image"
// import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

import { Button } from "@/components/ui/button"
// import { SubmitButton } from './button'
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

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
// import { NumberInput } from "@/components/ui/input-number"
import { Label } from "@/components/ui/label"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import {
//   Box,
//   Flex,
//   Text,
//   RadioCards
// } from "@radix-ui/themes";

// import { getBuyOrders } from "@/lib/db/queries"
// import { findBestsupplier } from '@/lib/db/queries';
import ScrollToTop from "@/components/scroll-top";
// import { Separator } from "@/components/ui/separator";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

export default async function Analytics() {
  // const orders = await getBuyOrders();
  // const [orders, setOrders] = useState([{ id: "1", price: 87000 }, { id: "2", price: 90000 }, { id: "3", price: 92000 }])

  // useEffect(() => {
  //   async function fetchOrders() {
  //     // const res = await fetch('https://api.vercel.app/blog')
  //     const orders = await getBuyOrders();
  //     // const data = await res.json()
  //     setOrders(orders)
  //   }
  //   fetchOrders()
  // }, [])

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: "",
  //   },
  // })

  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values)
  // }

  // const suppliers = await findBestsupplier("52.52512720854634", "29.638097637450272")

  return (
    <div>
      <ScrollToTop />
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
      <Card className="max-w-[600px] mx-auto my-4">
        <CardHeader>
          <CardTitle style={{ color: "green" }}>سفارش خرید</CardTitle>
          <CardDescription>پرداخت آنلاین</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-2 mt-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-md font-bold">پرداخت با موفقیت انجام شد!</Label>
                {/* خریدار:
                <ul>
                  <li>52.52512720854634</li>
                  <li>29.638097637450272</li>
                </ul>
                <Separator />
                فروشگاه ها:
                {suppliers.map(s =>
                  <ul key={s.id}>
                    <li>{s.lng}</li>
                    <li>{s.lat}</li>
                  </ul>
                )

                } */}
              </div>
              {/* <Input name="price" defaultValue="0" /> */}
              {/* <NumberInput title="کیسه" /> */}
            </div>
          </form>
          {/* <div className="flex justify-center items-center min-h-12 border border-dashed text-muted-foreground p-2 mt-8">
            برای مشاهده بازار فروش در بالا مشخص کنید که چه کالایی را با چه حجمی می‌خواهید. دقت کنید که جستجوی بازار بر اساس آدرس تحویل کالا انجام می‌شود.
          </div> */}
          {/* <div className="mt-8">
            <Text size="4" weight="bold" color="red">
              بازار فروش:
            </Text>
            <RadioCards.Root defaultValue={orders[0].id} color="green" columns={{ initial: "1", sm: "1" }} dir="rtl" className="mt-4">
              {orders.map((order) => (
                <RadioCards.Item key={order.id} value={order.id}>
                  <Flex direction="column" width="100%">
                    <Text weight="bold">سیمان فارس - {order.price} تومان</Text>
                    <Text>فروشگاه مصالح عباس پور</Text>
                  </Flex>
                </RadioCards.Item>)
              )}
            </RadioCards.Root>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">لغو سفارش</Button> */}
          <div />
          <Button style={{ backgroundColor: "green" }} disabled asChild>
            <Link href="/customer">پیگیری سفارش</Link>
          </Button>
          {/* <SubmitButton /> */}
        </CardFooter>
      </Card>
    </div>
  )
}
