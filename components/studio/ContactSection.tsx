import Image from 'next/image'

import { Button } from '@/components/studio/Button'
import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { Offices } from '@/components/studio/Offices'

export function ContactSection() {
  return (
    <Container className="my-24 sm:my-32 lg:my-40 relative">
      <Image
        alt="Mountains"
        src="/boomsaaz.jpg"
        // quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover', // cover, contain, none
        }}
      />
      {/* <FadeIn className="-mx-6 rounded-4xl bg-[#15A049] px-6 py-20 sm:mx-0 sm:py-32 md:px-12 relative z-10"> */}
      <FadeIn className="-mx-6 rounded-4xl px-6 py-20 sm:mx-0 sm:py-32 md:px-12 relative z-10">
        <div className="mx-auto max-w-4xl bg-stone-900 opacity-85">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              سفارش حرفه‌ای مصالح ساختمانی
            </h2>
            <div className="mt-6 flex">
              <Button href="/customer/order" invert>
                سفارش
              </Button>
            </div>
            <div className="mt-10 border-t border-white pt-10">
              <h3 className="font-display text-base font-semibold text-white">
                شرکت تجارت تجهیزات ره آورد
              </h3>
              <Offices
                invert
                className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
