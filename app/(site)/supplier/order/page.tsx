"use client"

import React, { useState, useEffect } from "react"
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
import { useRouter } from 'next/navigation'

import { getSupplierData, createSellOrder } from './actions'
import type { Supplier, TradingPair } from '@/lib/db/schema'

export default function SellOrderPage() {
  const router = useRouter()
  const [supplierData, setSupplierData] = useState<{
    supplier: Supplier;
    tradingPairs: NonNullable<TradingPair>[];
  } | null>(null)
  
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null)
  const [volume, setVolume] = useState("500")
  const [isCustomVolume, setIsCustomVolume] = useState(false)
  const [customVolume, setCustomVolume] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getSupplierData().then(data => {
      if (data) {
        // Filter out any null trading pairs
        const validTradingPairs = data.tradingPairs.filter((pair): pair is NonNullable<typeof pair> => pair !== null)
        setSupplierData({
          supplier: data.supplier,
          tradingPairs: validTradingPairs
        })
        if (validTradingPairs.length > 0) {
          setSelectedPair(validTradingPairs[0])
        }
      }
    })
  }, [])

  if (!supplierData) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    setIsSubmitting(true)
    try {
      const result = await createSellOrder(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push('/supplier')
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Theme>
      <form action={handleSubmit}>
        <Card className="max-w-[600px] mx-auto my-4">
          <CardHeader>
            <CardTitle>ثبت سفارش فروش</CardTitle>
            <CardDescription>برای {supplierData.supplier.name}</CardDescription>
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
                  defaultValue={supplierData.tradingPairs[0]?.id}
                  onValueChange={(value) => {
                    const pair = supplierData.tradingPairs.find(p => p.id === value)
                    if (pair) setSelectedPair(pair)
                  }}
                  name="tradingPairId"
                  columns="2"
                  dir="rtl"
                  color="red"
                >
                  {supplierData.tradingPairs.map(pair => (
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
                  defaultValue="500"
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setIsCustomVolume(true)
                      setVolume(customVolume || "500")
                    } else {
                      setIsCustomVolume(false)
                      setVolume(value)
                    }
                  }}
                  columns="2"
                  dir="rtl"
                  color="red"
                >
                  {["۵۰۰", "۱۰۰۰", "۲۰۰۰", "۳۰۰۰", "۴۰۰۰"].map((label, index) => {
                    const value = ["500", "1000", "2000", "3000", "4000"][index]
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
                <input type="hidden" name="volume" value={isCustomVolume ? customVolume : volume} />
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

            <input type="hidden" name="unit" value={selectedPair?.unit || ''} />
            <input type="hidden" name="city" value={supplierData.supplier.city || ''} />
            <input type="hidden" name="lng" value={supplierData.supplier.lng || ''} />
            <input type="hidden" name="lat" value={supplierData.supplier.lat || ''} />

            <Button 
              type="submit" 
              className="w-full mt-8" 
              style={{ backgroundColor: "red" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'در حال ثبت...' : 'ثبت سفارش'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Theme>
  )
}
