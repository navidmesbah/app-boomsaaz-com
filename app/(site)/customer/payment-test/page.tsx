'use client'

import { useState } from 'react'
import { initiateZarinpalPayment } from '../order/actions'

export default function PaymentTestPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Create a test order
      const orderData = {
        tradingPairId: 'test-order-id',
        volume: 1,
        price: 100000,
        unit: 'عدد',
        city: 'تهران',
        lat: 35.7219,
        lng: 51.3347,
        amount: 100000, // 100,000 Rials
        description: 'پرداخت تستی'
      }
      
      // Initiate payment
      const result = await initiateZarinpalPayment(orderData)
      
      if (result.error) {
        setError(result.error)
      } else if (result.redirectUrl) {
        setRedirectUrl(result.redirectUrl)
        // Redirect to Zarinpal payment page
        window.location.href = result.redirectUrl
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError('خطا در پردازش پرداخت')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">تست درگاه پرداخت زرین‌پال</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {redirectUrl && !error && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>درگاه پرداخت با موفقیت ایجاد شد.</p>
          <p className="text-sm mt-2 break-all">URL: {redirectUrl}</p>
        </div>
      )}
      
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'در حال پردازش...' : 'پرداخت تستی'}
      </button>
    </div>
  )
} 