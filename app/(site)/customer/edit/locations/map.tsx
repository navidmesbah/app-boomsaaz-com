// @ts-nocheck
"use client"

import React, { useState, useCallback, useRef } from "react"
// import Link from "next/link"
// import Image from "next/image"
import { Map, Marker, MapRef, GeolocateControl } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below

import { MapPin } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { SubmitButton } from './button'
// import { Input } from "@/components/ui/input"
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

import {
    Box,
    Flex,
    Text,
    RadioCards
} from "@radix-ui/themes";

// import { getBuyOrders } from "@/lib/db/queries"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

import { create } from './actions'
// import { Separator } from "@/components/ui/separator";

export default function Analytics(props: any) {
    // const orders = await getBuyOrders();
    // const [orders, setOrders] = useState([{ id: "1", price: 87000 }, { id: "2", price: 90000 }, { id: "3", price: 92000 }])
    const [city, setCity] = useState(props.location[0].city)
    const [lng, setLng] = useState(props.location[0].lng)
    const [lat, setLat] = useState(props.location[0].lat)

    const mapRef = useRef<MapRef>();

    const onCityChange = useCallback((value: any) => {
        setCity(value)

        if (city === "شیراز") {
            setLng(51.33808144535957)
            setLat(35.6997281290379)
        } else {
            setLng(52.51980110816994)
            setLat(29.63149899491558)
        }
        // console.log("onCityChange")
        // console.log("value", value)

        const map = {
            "شیراز": [51.33808144535957, 35.6997281290379],
            "تهران": [52.51980110816994, 29.63149899491558]
        } as any

        // console.log(map[city])

        mapRef.current?.flyTo({ center: map[city], duration: 2000 });
    }, [city]);

    function onConfirmAddress() {
        if (mapRef.current) {
            const center = mapRef.current.getCenter();
            // console.log("Longitude:", center.lng, "Latitude:", center.lat);
            setLng(center.lng)
            setLat(center.lat)

            mapRef.current?.flyTo({ center: [center.lng, center.lat - 0.001], duration: 1000 });
            // alert(`Center: Longitude: ${center.lng}, Latitude: ${center.lat}`);
            // alert(position)
        }
    }

    // useEffect(() => {
    //   async function fetchOrders() {
    //     // const res = await fetch('https://api.vercel.app/blog')
    //     const orders = await getBuyOrders();
    //     // const data = await res.json()
    //     setOrders(orders)
    //   }
    //   fetchOrders()
    // }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const createOrderWithPosition = create.bind(null, lng, lat)

    return (
        <form action={createOrderWithPosition}>
            <Card className="max-w-[600px] mx-auto my-4">
                <CardHeader>
                    <CardTitle>محل منتخب</CardTitle>
                    <CardDescription>آدرس منتخب</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <form> */}
                    <div className="grid w-full items-center gap-2 mt-4">
                        {/* <div className="flex flex-col space-y-1.5"> */}
                        <Label htmlFor="name" className="text-md font-bold">شهر:</Label>
                        <Box>
                            {/* <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "2" }} dir="rtl"> */}
                            <RadioCards.Root defaultValue={city} onValueChange={value => onCityChange(value)} columns="2" dir="rtl" name="city">
                                <RadioCards.Item value="تهران">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">تهران</Text>
                                        {/* <Text>پاکت/ یا تناژ</Text> */}
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="شیراز">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">شیراز</Text>
                                        {/* <Text>پاکت/ یا تناژ</Text> */}
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="3" disabled>
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">بوشهر</Text>
                                        {/* <Text>یک کامیون/ یا تناژ</Text> */}
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="4" disabled>
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">بندرعباس</Text>
                                        {/* <Text>یک کامیون/ یا تناژ</Text> */}
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="5" disabled>
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">اصفهان</Text>
                                        {/* <Text>تانکر</Text> */}
                                    </Flex>
                                </RadioCards.Item>
                            </RadioCards.Root>
                        </Box>
                    </div>
                    <div className="text-lg font-bold mt-8">مقصد تحویل بار:</div>
                    <div className="grid w-full items-center gap-2 mt-4">
                        <div>
                            {/* <Label htmlFor="name" className="text-md font-bold mt-4">موقعیت تحویل بار:</Label> */}
                            <div className="relative -top-12 mt-4">
                                <MapPin size={48} color="black" className="relative top-[150px] right-[calc(50%-25px)] z-40" />
                                <Map
                                    ref={mapRef}
                                    initialViewState={{
                                        longitude: lng,
                                        latitude: lat,
                                        zoom: 15
                                    }}
                                    style={{ width: "100%", height: 300 }}
                                    mapStyle='https://api.maptiler.com/maps/basic-v2/style.json?key=l2lhfToTYDJSlIPhOJ7E'
                                    className="relative z-30"
                                >
                                    <Marker longitude={lng} latitude={lat} anchor="bottom" >
                                        <MapPin size={48} color="red" />
                                        <span className="bg-white text-lg font-bold">
                                            مقصد بار
                                        </span>
                                    </Marker>
                                    <GeolocateControl />
                                </Map>
                                <Button type="button" onClick={() => onConfirmAddress()} className="m-2">تایید مقصد</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div />
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    )
}
