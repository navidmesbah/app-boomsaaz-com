"use client"
// import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//       <section className="bg-stone-200 dark:bg-stone-600 min-h-[100px]">
//         section 01
//       </section>
//       <section className="bg-stone-100 dark:bg-stone-700 min-h-[200px] mx-auto max-w-[1000px] p-4">
//         Section 02
//       </section>
//     </>
//   );
// }

// import { type Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
// import Link from 'next/link'

// import { ContactSection } from '@/components/studio/ContactSection'
import { Container } from '@/components/studio/Container'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'
import { List, ListItem } from '@/components/studio/List'
import { SectionIntro } from '@/components/studio/SectionIntro'
// import { StylizedImage } from '@/components/studio/StylizedImage'
// import { Testimonial } from '@/components/studio/Testimonial'
// import logoBrightPath from '@/components/images/clients/bright-path/logo-light.svg'
// import logoFamilyFund from '@/components/images/clients/family-fund/logo-light.svg'
// import logoGreenLife from '@/components/images/clients/green-life/logo-light.svg'
// import logoHomeWork from '@/components/images/clients/home-work/logo-light.svg'
// import logoMailSmirk from '@/components/images/clients/mail-smirk/logo-light.svg'
// import logoNorthAdventures from '@/components/images/clients/north-adventures/logo-light.svg'
// import logoPhobiaDark from '@/components/images/clients/phobia/logo-dark.svg'
// import logoPhobiaLight from '@/components/images/clients/phobia/logo-light.svg'
// import logoUnseal from '@/components/images/clients/unseal/logo-light.svg'
import imageServices from '@/components/images/640x1138.jpg'
// import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

import { motion, useScroll, useTransform } from "framer-motion";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { ColorfulText } from "@/components/ui/colorful-text";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
// import { MacbookScroll } from "@/components/ui/macbook-scroll";
// import { Meteors } from '@/components/ui/meteor-effect';
// import { MovingBorder } from '@/components/ui/moving-border'
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
// import { BackgroundGradient } from "@/components/ui/background-gradient";
// import { IconAppWindow } from "@tabler/icons-react";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// import { FeaturesSection } from './features'

// import { Button } from '@/components/ui/moving-border'

import { Circle } from "lucide-react"
// import { relative } from 'path'

// const words = `بوم ساز بوم ساز بوم ساز بوم ساز بوم ساز بوم ساز بوم ساز بوم سازبوم ساز بوم ساز بوم ساز بوم سازبوم ساز بوم ساز بوم ساز بوم سازبوم ساز بوم ساز بوم ساز بوم ساز`;

// const clients = [
//   ['Phobia', logoPhobiaLight],
//   ['Family Fund', logoFamilyFund],
//   ['Unseal', logoUnseal],
//   ['Mail Smirk', logoMailSmirk],
//   ['Home Work', logoHomeWork],
//   ['Green Life', logoGreenLife],
//   ['Bright Path', logoBrightPath],
//   ['North Adventures', logoNorthAdventures],
// ]

const products = [
  ['سیمان', Circle],
  ['پودر سنگ', Circle],
  ['ماسه', Circle],
  ['آجر', Circle],
  ['آب', Circle],
  ['گچ', Circle],
  ['آهن', Circle],
  ['خاک', Circle],
]

function Clients() {
  return (
    // <div className="mt-24 rounded-4xl py-20 sm:mt-32 sm:py-32 lg:mt-56 bg-[url(/boomsaaz-2.jpg)] bg-center bg-no-repeat bg-cover">
    <div className="relative mt-24 py-20 sm:mt-32 sm:py-32 lg:mt-56">
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
      <Container className="bg-stone-900 p-8 opacity-85 relative z-10">
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-background sm:text-left">
            سفارش حرفه‌ای ده‌ها محصول
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {/* {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))} */}
            {products.map(([product, Icon]) => (
              <li key={product}>
                <FadeIn>
                  <div className="flex items-center">
                    {/* <Image src={logo} alt={product} unoptimized /> */}
                    <Icon className="text-background" />
                    <span className="text-background font-medium text-xl mr-2">{product}</span>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

// function CaseStudies({
//   caseStudies,
// }: {
//   caseStudies: Array<MDXEntry<CaseStudy>>
// }) {
//   return (
//     <>
//       <SectionIntro
//         title="شکل دادن به آینده با فناوری هوشمند"
//         className="mt-24 sm:mt-32 lg:mt-40"
//       >
//         <p>
//           توضیحات
//         </p>
//       </SectionIntro>
//       <Container className="mt-16">
//         <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//           {caseStudies.map((caseStudy) => (
//             <FadeIn key={caseStudy.href} className="flex">
//               <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
//                 <h3>
//                   <Link href={caseStudy.href}>
//                     <span className="absolute inset-0 rounded-3xl" />
//                     <Image
//                       src={caseStudy.logo}
//                       alt={caseStudy.client}
//                       className="h-16 w-16"
//                       unoptimized
//                     />
//                   </Link>
//                 </h3>
//                 <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
//                   <time
//                     dateTime={caseStudy.date.split('-')[0]}
//                     className="font-semibold"
//                   >
//                     {caseStudy.date.split('-')[0]}
//                   </time>
//                   <span className="text-neutral-300" aria-hidden="true">
//                     /
//                   </span>
//                   <span>Case study</span>
//                 </p>
//                 <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
//                   {caseStudy.title}
//                 </p>
//                 <p className="mt-4 text-base text-neutral-600">
//                   {caseStudy.description}
//                 </p>
//               </article>
//             </FadeIn>
//           ))}
//         </FadeInStagger>
//       </Container>
//     </>
//   )
// }

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="راهکارها"
        title="با کمک فناوری بهره‌وری ساخت و ساز را بالا ببرید."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          توضیحات
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              {/* <StylizedImage
                src={imageServices}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
                shape={3}
              /> */}
              <Image
                src={imageServices}
                alt="Services"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pr-4">
            <ListItem title="سفارش حرفه‌ای مصالح">
              توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات.
            </ListItem>
            <ListItem title="بهینه ترین محصول برای شما">
              توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات.
            </ListItem>
            <ListItem title="گزارش و تحلیل سفارشات">
              توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات.
            </ListItem>
            {/* <ListItem title="Custom content management">
              At Studio we understand the importance of having a robust and
              customised CMS. That’s why we run all of our client projects out
              of a single, enormous Joomla instance.
            </ListItem> */}
          </List>
        </div>
      </Container>
    </>
  )
}

// export const metadata: Metadata = {
//   description:
//     'We are a development studio working at the intersection of design and technology.',
// }

export default function Home() {
  // let caseStudies = (await loadCaseStudies()).slice(0, 3)
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <>
      {/* <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-7xl">
            بررسی، انتخاب و سفارش مصالح ساختمانی.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
          <p className="mt-6 text-xl text-muted-foreground">
            توضیحات
          </p>
        </FadeIn>
      </Container> */}

      {/* <HeroParallax products={heroproducts} /> */}

      <div className='max-w-[1440px] mx-auto'>
        <video muted autoPlay loop playsInline className="w-full">
          <source src="/video_sd.mp4" type="video/mp4" />
          {/* <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
          /> */}
          Your browser does not support the video tag.
        </video>
      </div>

      <Container className="max-w-[1440px] mx-auto">
        <FadeIn className="absolute top-14 lg:top-52 max-w-[300px] sm:max-w-[420px] md:max-w-2xl bg-white p-4">
          {/* <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"> */}
          <h1 className="font-display text-xl font-medium tracking-tight text-stone-900 [text-wrap:balance] sm:text-5xl md:text-7xl">
            بررسی، انتخاب و سفارش مصالح ساختمانی.
          </h1>
          {/* <p className="mt-6 text-xl text-neutral-600"> */}
          <p className="mt-6 text-xl text-muted-foreground">
            در پلتفرم اقتصادی بوم ساز!
          </p>
        </FadeIn>
      </Container>

      <div
        className="h-[1440px] bg-black w-full dark:border dark:border-white/[0.1] relative pt-40 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          title="سفارش حرفه‌ای مصالح ساختمانی"
          description="بوم ساز؛ پلتفرمی هوشمند برای خرید بی‌واسطه، با سرعت و دقت در دنیای نوین ساخت‌وساز!"
        />
      </div>

      {/* <Clients /> */}

      {/* <CaseStudies caseStudies={caseStudies} /> */}

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: Circle }}
      >
        تعریف مشتری
      </Testimonial> */}

      {/* <Services /> */}

      {/* <div className="max-w-[1000px] mx-auto">
        <TextGenerateEffect words={words} />
      </div> */}

      {/* <FeaturesSection /> */}

      {/* <div className="p-10"> */}
      <StickyScroll content={content} />
      {/* </div> */}

      {/* <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white"> */}
      {/* <div className="w-full flex items-center justify-center relative overflow-hidden bg-background py-[100px]">
        <motion.img
          src="https://assets.aceternity.com/linear-demo.webp"
          className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
          . <ColorfulText text="سفارش حرفه‌ای مصالح ساختمانی" /> <br /> .
        </h1>
      </div> */}

      <ParallaxScroll images={images} />

      {/* <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
        <MacbookScroll
          title={
            <span>
              This Macbook is built with Tailwindcss. <br /> No kidding.
            </span>
          }
          badge={
            <Link href="https://peerlist.io/manuarora">
              <Badge className="h-10 w-10 transform -rotate-12" />
            </Link>
          }
          src={`/linear.webp`}
          showGradient={false}
        />
      </div> */}

      {/* <div className="">
        <div className=" w-full relative max-w-xs">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-2 w-2 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                />
              </svg>
            </div>

            <h1 className="font-bold text-xl text-white mb-4 relative z-50">
              Meteors because they&apos;re cool
            </h1>

            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
              I don&apos;t know what to write so I&apos;ll just paste something
              cool here. One more sentence because lorem ipsum is just
              unacceptable. Won&apos;t ChatGPT the shit out of this.
            </p>

            <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
              Explore
            </button>
            <Meteors number={20} />
          </div>
        </div>
      </div>

      <div>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Borders are cool
        </Button>
      </div>

      <div>
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Image
            src={`/jordans.webp`}
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Air Jordan 4 Retro Reimagined
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
            February 17, 2024. Your best opportunity to get these right now is by
            entering raffles and waiting for the official releases.
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Buy now </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              $100
            </span>
          </button>
        </BackgroundGradient>
      </div> */}

      {/* <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white"> */}
      {/* <div className="w-full flex items-center justify-center relative overflow-hidden bg-background py-[100px]">
        <motion.img
          src="https://assets.aceternity.com/linear-demo.webp"
          className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
          . <ColorfulText text="سفارش حرفه‌ای مصالح ساختمانی" /> <br /> .
        </h1>
      </div> */}

      <div className="w-full h-full py-20 pr-4">
        <h2 className="max-w-7xl pr-2 mx-auto text-xl md:text-5xl font-medium text-neutral-800 dark:text-neutral-200 font-sans">
          در وبلاگ بوم ساز بیشتر بخوانید:
        </h2>
        <Carousel items={cards} />
      </div>

      {/* <ContactSection /> */}
    </>
  )
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              // src="https://assets.aceternity.com/macbook.png"
              src="/boomsaaz.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "بوم ساز",
    title: "ساخت و ساز مدرن",
    src: "/blog00.jpg",
    content: <DummyContent />,
  },
  {
    category: "بوم ساز",
    title: "ساخت و ساز حرفه ای",
    src: "/blog01.jpg",
    content: <DummyContent />,
  },
  {
    category: "بوم ساز",
    title: "شهر سازی مدرن",
    src: "/blog02.jpg",
    content: <DummyContent />,
  },

  {
    category: "بوم ساز",
    title: "طراحی با بتن",
    src: "/blog03.jpg",
    content: <DummyContent />,
  },
  {
    category: "بوم ساز",
    title: "آورده های ساختمانی کلاسیک",
    src: "/blog04.jpg",
    content: <DummyContent />,
  },
  {
    category: "بوم ساز",
    title: "نگهداری از زیست بوم",
    src: "/blog05.jpg",
    content: <DummyContent />,
  },
];


// Peerlist logo
// const Badge = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
//         fill="#00AA45"
//       ></path>
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//         fill="#219653"
//       ></path>
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
//         fill="#24292E"
//       ></path>
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
//         fill="white"
//       ></path>
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
//         fill="#24292E"
//       ></path>
//     </svg>
//   );
// };

export const heroproducts = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "/boomsaaz.jpg",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "/boomsaaz.jpg",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "/boomsaaz.jpg",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "/boomsaaz.jpg",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "/boomsaaz.jpg",
  },
];

const content = [
  {
    title: "خرید مستقیم، بدون واسطه",
    description: "وم ساز واسطه‌ها را حذف کرده و امکان خرید مستقیم از تأمین‌کنندگان اصلی را فراهم می‌کند. این یعنی کاهش هزینه‌های اضافی، شفافیت در قیمت‌گذاری و دسترسی به مصالح باکیفیت بدون دغدغه. در بازار سنتی، حضور واسطه‌ها باعث افزایش قیمت و پیچیدگی در فرآیند خرید می‌شود، اما با بوم ساز، شما می‌توانید به‌سادگی مصالح موردنیاز خود را از تولیدکنندگان معتبر سفارش دهید. این روش نه‌تنها هزینه‌ها را کاهش می‌دهد، بلکه کیفیت و اصالت محصولات را نیز تضمین می‌کند و تجربه خریدی سریع، مطمئن و بهینه را برای شما فراهم می‌آورد.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/f01.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "مقایسه و انتخاب هوشمندانه",
    description: "بوم ساز به شما امکان مقایسه تخصصی مصالح ساختمانی را می‌دهد تا بتوانید بهترین انتخاب را داشته باشید. با استفاده از فیلترهای هوشمند، مشخصات فنی، قیمت، کیفیت و نظرات کاربران را بررسی کرده و مصالح موردنیاز خود را آگاهانه خریداری کنید. بازار سنتی اغلب فاقد اطلاعات دقیق و به‌روز است، اما بوم ساز با ارائه جزئیات کامل درباره هر محصول، تصمیم‌گیری را آسان می‌کند. دیگر نیازی به جست‌وجوی طولانی‌مدت در بازار ندارید؛ با چند کلیک ساده، بهترین گزینه را متناسب با نیازهای پروژه خود پیدا خواهید کرد.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/f02.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "تحویل سریع و مطمئن",
    description: "بوم ساز با بهره‌گیری از یک سیستم لجستیکی پیشرفته، مصالح ساختمانی را در کمترین زمان ممکن به محل پروژه شما می‌رساند. زمان تحویل یکی از چالش‌های مهم در پروژه‌های ساختمانی است و تأخیر در دریافت مصالح می‌تواند روند کار را مختل کند. ما با همکاری تأمین‌کنندگان و شرکت‌های حمل‌ونقل معتبر، سفارشات را با برنامه‌ریزی دقیق ارسال می‌کنیم. شما می‌توانید وضعیت سفارش خود را لحظه‌به‌لحظه پیگیری کنید و از تحویل سریع و بدون دردسر اطمینان داشته باشید. بوم ساز، سرعت و دقت را در کنار هم قرار داده تا پروژه‌های ساختمانی شما بدون توقف پیش بروند.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/f03.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "پشتیبانی حرفه‌ای و تخصصی",
    description: "بوم ساز تنها یک پلتفرم فروش نیست، بلکه یک همراه مطمئن در مسیر خرید مصالح ساختمانی است. تیم پشتیبانی ما متشکل از کارشناسان باتجربه‌ای است که در تمامی مراحل خرید، انتخاب محصول و فرآیند حمل‌ونقل کنار شما هستند. اگر در انتخاب مصالح دچار تردید هستید یا به مشاوره فنی نیاز دارید، ما آماده‌ایم تا به شما کمک کنیم. همچنین، محتوای آموزشی و راهنمای خرید موجود در بوم ساز به شما کمک می‌کند تا خریدی آگاهانه و بدون دغدغه داشته باشید. ما همیشه در کنار شما هستیم تا تجربه‌ای حرفه‌ای و مطمئن را فراهم کنیم.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/f04.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

const images = [
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
  "/boomsaaz.jpg",
];
