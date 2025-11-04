// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link'

import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { Logo } from '@/components/studio/Logo'
import { socialMediaProfiles } from '@/components/studio/SocialMedia'
import { ModeToggle } from '../theme-toggle'

const navigation = [
  {
    title: 'تحلیل بازار',
    links: [
      { title: 'چشم انداز', href: '/solutions' },
      { title: 'تازه ها', href: '/solutions' },
      // {
      //   title: (
      //     <>
      //       بیشتر <span aria-hidden="true">&larr;</span>
      //     </>
      //   ),
      //   href: '/solutions',
      // },
    ],
  },
  {
    title: 'لیست قیمت',
    links: [
      { title: 'مصالح', href: '/showcase' },
      { title: 'آهن آلات', href: '/showcase' },
      { title: 'تجهیزات', href: '/showcase' },
      // {
      //   title: (
      //     <>
      //       بیشتر <span aria-hidden="true">&larr;</span>
      //     </>
      //   ),
      //   href: '/showcase',
      // },
    ],
  },
  {
    title: 'شرکت',
    links: [
      { title: 'درباره ما', href: '/about' },
      { title: 'تماس با ما', href: '/contact' },
      { title: 'وبلاگ', href: '/blog' },
      // { title: 'Process', href: '/process' },
      // { title: 'Contact us', href: '/contact' },
    ],
  },
  // {
  //   title: 'Connect',
  //   links: socialMediaProfiles,
  // },
]

function Navigation() {
  return (
    <nav className="lg:col-span-3">
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            {/* <div className="font-display text-sm font-semibold tracking-wider text-neutral-950"> */}
            <div className="font-display text-sm font-semibold tracking-wider text-foreground">
              {section.title}
            </div>
            {/* <ul role="list" className="mt-4 text-sm text-neutral-700"> */}
            <ul role="list" className="mt-4 text-sm text-muted-foreground">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    // className="transition hover:text-neutral-950"
                    className="transition hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4">
          <Navigation />
          <div className="flex justify-end">
            {/* <NewsletterForm /> */}
            {/* <span className="ml-2 pt-2">نور زمینه:</span> */}
            <ModeToggle />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-border pt-12">
          {/* <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link> */}
          <Link href="/" className="flex gap-2" aria-label="Home">
            <svg viewBox="0 0 1400 1400" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-7">
              <rect width="1400" height="1400" fill="#15A049" />
              <rect x="1150" y="250" width="100" height="100" fill="white" />
              <rect x="950" y="450" width="100" height="100" fill="white" />
              <rect x="550" y="750" width="100" height="400" fill="white" />
              <rect x="350" y="950" width="100" height="200" fill="white" />
              <rect x="150" y="350" width="100" height="300" fill="white" />
              <rect x="950" y="250" width="100" height="100" fill="white" />
              <rect x="550" y="250" width="100" height="100" fill="white" />
              <rect x="750" y="150" width="100" height="200" fill="white" />
              <rect x="350" y="250" width="100" height="100" fill="white" />
              <rect x="750" y="350" width="500" height="100" fill="white" />
              <rect x="550" y="1150" width="200" height="100" fill="white" />
              <rect x="850" y="1150" width="100" height="100" fill="white" />
              <rect x="1050" y="1150" width="100" height="100" fill="white" />
              <rect x="850" y="150" width="100" height="100" fill="white" />
              <rect x="750" y="1050" width="100" height="100" fill="white" />
              <rect x="950" y="1050" width="100" height="100" fill="white" />
              <rect x="1150" y="950" width="100" height="200" fill="white" />
              <rect x="350" y="150" width="300" height="100" fill="white" />
              <rect x="1150" y="550" width="100" height="100" fill="white" />
              <rect x="350" y="750" width="100" height="100" fill="white" />
              <rect x="750" y="550" width="200" height="100" fill="white" />
              <rect x="150" y="1150" width="200" height="100" fill="white" />
              <rect x="450" y="350" width="200" height="100" fill="white" />
              <rect x="150" y="250" width="200" height="100" fill="white" />
            </svg>
            {/* <span className="text-base font-bold">بوم ساز</span> */}
            <span className="sr-only">بوم ساز</span>
          </Link>
          {/* <p className="text-sm text-neutral-700"> */}
          <p className="text-sm text-muted-foreground">
            BoomSaaz. {new Date().getFullYear()} ©
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
