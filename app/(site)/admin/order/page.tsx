"use client"

import React, { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Box,
  Flex,
  Text,
  RadioCards,
  Theme
} from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { useRouter, useSearchParams } from 'next/navigation'
import { MapModal } from "@/components/map-modal"
import { toast } from "sonner"

import { createBuyOrder, getTradingPairs } from './actions'
import type { TradingPair } from '@/lib/db/schema'

// Loading component for Suspense fallback
function OrderFormLoading() {
  return (
    <Card className="max-w-[600px] mx-auto my-4">
      <CardHeader>
        <CardTitle>در حال بارگذاری...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main order form component that uses useSearchParams
function OrderForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([])
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null)
  const [volume, setVolume] = useState("50")
  const [isCustomVolume, setIsCustomVolume] = useState(false)
  const [customVolume, setCustomVolume] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; city: string } | null>(null)
  const [shareableLink, setShareableLink] = useState<string>("")

  // Function to generate the shareable link
  const generateShareableLink = () => {
    if (!selectedPair) return ""
    
    const baseUrl = window.location.origin
    let link = `${baseUrl}/customer/order?pair=${selectedPair.id}`
    
    // Add volume parameter if available
    if (volume) {
      link += `&volume=${volume}`
    }
    
    // Add location parameters if available
    if (selectedLocation) {
      link += `&lat=${selectedLocation.lat}&lng=${selectedLocation.lng}&city=${encodeURIComponent(selectedLocation.city)}`
    }
    
    return link
  }

  // Update shareable link whenever relevant parameters change
  useEffect(() => {
    const link = generateShareableLink()
    setShareableLink(link)
  }, [selectedPair, volume, selectedLocation])

  useEffect(() => {
    getTradingPairs().then(pairs => {
      setTradingPairs(pairs)
      
      // Get the pair ID from search params
      const pairId = searchParams.get('pair')
      
      if (pairId) {
        // Find the pair with the matching ID
        const pair = pairs.find(p => p.id === pairId)
        if (pair) {
          setSelectedPair(pair)
        } else if (pairs.length > 0) {
          setSelectedPair(pairs[0])
        }
      } else if (pairs.length > 0) {
        setSelectedPair(pairs[0])
      }
    })
  }, [searchParams])

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    setIsSubmitting(true)
    try {
      const result = await createBuyOrder(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push('/customer/order3')
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLocationSelect = (location: { lat: number; lng: number; city: string }) => {
    setSelectedLocation(location)
  }

  const handleCopyLink = () => {
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("لینک با موفقیت کپی شد")
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        toast.error("خطا در کپی کردن لینک")
      })
  }

  if (!tradingPairs.length) {
    return <div>Loading...</div>
  }

  return (
    <Theme>
      <form action={handleSubmit}>
        <Card className="max-w-[600px] mx-auto my-4">
          <CardHeader>
            <CardTitle>ثبت سفارش خرید</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div>
              <Text size="4" weight="bold">محصول:</Text>
              <Box mt="2">
                <RadioCards.Root
                  defaultValue={selectedPair?.id || tradingPairs[0]?.id}
                  onValueChange={(value) => {
                    const pair = tradingPairs.find(p => p.id === value)
                    if (pair) setSelectedPair(pair)
                  }}
                  name="tradingPairId"
                  columns="2"
                  dir="rtl"
                  color="green"
                >
                  {tradingPairs.map(pair => (
                    <RadioCards.Item key={pair.id} value={pair.id}>
                      <Flex direction="column" width="100%">
                        <Text weight="bold">{pair.baseCurrency}</Text>
                        <Text>{pair.price} تومان - {pair.unit}</Text>
                      </Flex>
                    </RadioCards.Item>
                  ))}
                </RadioCards.Root>
              </Box>
            </div>

            <div>
              <Text size="4" weight="bold" className="mt-8">حجم سفارش به {selectedPair?.unit}:</Text>
              <Box mt="2">
                <RadioCards.Root
                  defaultValue="50"
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setIsCustomVolume(true)
                      setVolume(customVolume || "50")
                    } else {
                      setIsCustomVolume(false)
                      setVolume(value)
                    }
                  }}
                  columns="2"
                  dir="rtl"
                  color="green"
                >
                  {["۵۰", "۱۰۰", "۲۰۰", "۳۰۰", "۴۰۰"].map((label, index) => {
                    const value = ["50", "100", "200", "300", "400"][index]
                    return (
                      <RadioCards.Item key={value} value={value}>
                        <Flex direction="column" width="100%">
                          <Text weight="bold">{label}</Text>
                        </Flex>
                      </RadioCards.Item>
                    )
                  })}
                  <RadioCards.Item value="custom">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">حجم دلخواه</Text>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
                {isCustomVolume && (
                  <Box mt="2">
                    <Input
                      type="number"
                      placeholder="حجم دلخواه را وارد کنید"
                      value={customVolume}
                      onChange={(e) => {
                        const value = e.target.value
                        setCustomVolume(value)
                        setVolume(value)
                      }}
                      className="mt-2"
                    />
                  </Box>
                )}
                <input type="hidden" name="volume" value={volume} />
              </Box>
            </div>

            <div>
              <Text size="4" weight="bold" className="mt-8">قیمت (تومان):</Text>
              <Input
                name="price"
                type="number"
                placeholder="قیمت به تومان"
                className="mt-2"
                defaultValue={selectedPair?.price || ''}
                key={selectedPair?.id}
              />
            </div>

            <div>
              <Text size="4" weight="bold" className="mt-8">موقعیت:</Text>
              <div className="mt-2 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsMapModalOpen(true)}
                >
                  انتخاب موقعیت روی نقشه
                </Button>
                {selectedLocation && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">شهر: {selectedLocation.city}</p>
                    <p className="text-sm">عرض جغرافیایی: {selectedLocation.lat.toFixed(6)}</p>
                    <p className="text-sm">طول جغرافیایی: {selectedLocation.lng.toFixed(6)}</p>
                  </div>
                )}
                <input type="hidden" name="city" value={selectedLocation?.city || ''} />
                <input type="hidden" name="lat" value={selectedLocation?.lat || ''} />
                <input type="hidden" name="lng" value={selectedLocation?.lng || ''} />
              </div>
            </div>

            <input type="hidden" name="unit" value={selectedPair?.unit || ''} />

            {/* Submit button removed as requested */}
          </CardContent>
        </Card>
      </form>

      <Card className="max-w-[600px] mx-auto my-4">
        <CardHeader>
          <CardTitle>ایجاد لینک اشتراک‌گذاری</CardTitle>
          <CardDescription>لینک زیر را برای مشتری ارسال کنید تا بتواند سفارش خود را ثبت کند</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Text size="2" weight="bold">لینک اشتراک‌گذاری:</Text>
            <div className="flex flex-col space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg break-all text-sm" dir="ltr">
                {shareableLink || `https://www.boomsaaz.com/customer/order?pair=${selectedPair?.id || ''}`}
              </div>
              <Button 
                onClick={handleCopyLink}
                variant="outline"
                className="w-full"
              >
                کپی لینک
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={selectedLocation || undefined}
      />
    </Theme>
  )
}

// Main page component with Suspense boundary
export default function BuyOrderPage() {
  return (
    <Suspense fallback={<OrderFormLoading />}>
      <OrderForm />
    </Suspense>
  )
}
