"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, Flex, Text, RadioCards, Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

function OrderMockupSection() {
  const mockPairs = [
    { id: 'cement', baseCurrency: 'سیمان', price: 320000, unit: 'کیسه' },
    { id: 'sand', baseCurrency: 'ماسه', price: 180000, unit: 'تن' },
    { id: 'brick', baseCurrency: 'آجر', price: 2500, unit: 'عدد' },
  ]
  const [selectedPairId, setSelectedPairId] = React.useState<string>(mockPairs[0].id)
  const selectedPair = React.useMemo(() => mockPairs.find(p => p.id === selectedPairId)!, [selectedPairId])
  const [isCustomVolume, setIsCustomVolume] = React.useState(false)
  const [volume, setVolume] = React.useState<string>('50')
  const [customVolume, setCustomVolume] = React.useState<string>('')
  const [city, setCity] = React.useState<string>('')

  const numericVolume = Number(volume || 0)
  const totalPrice = (selectedPair?.price || 0) * (isNaN(numericVolume) ? 0 : numericVolume)

  return (
    <section className="py-8 my-16">
      <Theme>
        <UiCard className="max-w-[600px] mx-auto">
          <CardHeader>
            <CardTitle>ثبت سفارش خرید (نمونه)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Text size="4" weight="bold">محصول:</Text>
              <Box mt="2">
                <RadioCards.Root
                  value={selectedPairId}
                  onValueChange={(value) => setSelectedPairId(value)}
                  name="tradingPairId"
                  columns="2"
                  dir="rtl"
                  color="green"
                >
                  {mockPairs.map(pair => (
                    <RadioCards.Item key={pair.id} value={pair.id}>
                      <Flex direction="column" width="100%">
                        <Text weight="bold">{pair.baseCurrency}</Text>
                        <Text>{pair.price.toLocaleString()} تومان - {pair.unit}</Text>
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
                  value={isCustomVolume ? 'custom' : volume}
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      setIsCustomVolume(true)
                      setVolume(customVolume || '50')
                    } else {
                      setIsCustomVolume(false)
                      setVolume(value)
                    }
                  }}
                  columns="2"
                  dir="rtl"
                  color="green"
                >
                  {['۵۰', '۱۰۰', '۲۰۰', '۳۰۰', '۴۰۰'].map((label, index) => {
                    const value = ['50', '100', '200', '300', '400'][index]
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
              </Box>
            </div>

            <div>
              <Text size="4" weight="bold" className="mt-8">موقعیت:</Text>
              <Box mt="2">
                <Input
                  placeholder="نام شهر را وارد کنید (نمونه)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Box>
            </div>

            <div className="mt-4 border-t pt-4">
              <Text size="4" weight="bold" className="mb-4">فاکتور سفارش:</Text>
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <Text>شهر:</Text>
                  <Text>{city || 'انتخاب نشده'}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>کالا:</Text>
                  <Text>{selectedPair?.baseCurrency}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>قیمت هر {selectedPair?.unit}:</Text>
                  <Text>{selectedPair?.price.toLocaleString()} تومان</Text>
                </div>
                <div className="flex justify-between">
                  <Text>قیمت کل:</Text>
                  <Text>{(isNaN(totalPrice) ? 0 : totalPrice).toLocaleString()} تومان</Text>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold">
                  <Text>قابل پرداخت:</Text>
                  <Text>{(isNaN(totalPrice) ? 0 : totalPrice).toLocaleString()} تومان</Text>
                </div>
              </div>
            </div>

            <Button
              type="button"
              className="w-full mt-4"
              style={{ backgroundColor: 'green' }}
              onClick={() => { /* no-op mockup */ }}
            >
              پرداخت (نمونه)
            </Button>
          </CardContent>
        </UiCard>
      </Theme>
    </section>
  )
}

export default function Home() {
  return <OrderMockupSection />
}
