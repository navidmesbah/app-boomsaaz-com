"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { verifyZarinpalPayment } from '../order/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function PaymentVerificationContent() {
  const searchParams = useSearchParams()
  const [verificationResult, setVerificationResult] = useState<{
    success?: boolean
    error?: string
    refId?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const authority = searchParams.get('Authority')
        const status = searchParams.get('Status')

        if (!authority || !status) {
          setVerificationResult({ error: 'پارامترهای پرداخت نامعتبر است' })
          setIsLoading(false)
          return
        }

        const result = await verifyZarinpalPayment(authority, status)
        setVerificationResult(result)
      } catch (error) {
        console.error('Error verifying payment:', error)
        setVerificationResult({ error: 'خطا در تایید پرداخت' })
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">در حال تایید پرداخت...</h1>
          <p className="text-gray-600">لطفا صبر کنید</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">نتیجه پرداخت</h1>
        
        {verificationResult?.error ? (
          <div className="text-center">
            <p className="text-red-600 mb-4">{verificationResult.error}</p>
            <Button asChild>
              <Link href="/customer/order">بازگشت به صفحه سفارش</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-2">پرداخت با موفقیت انجام شد</p>
            {verificationResult?.refId && (
              <p className="text-gray-600 mb-4">
                کد پیگیری: {verificationResult.refId}
              </p>
            )}
            <Button asChild>
              <Link href="/customer">مشاهده سفارش‌ها</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PaymentVerificationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">در حال بارگذاری...</h1>
          <p className="text-gray-600">لطفا صبر کنید</p>
        </div>
      </div>
    }>
      <PaymentVerificationContent />
    </Suspense>
  )
} 