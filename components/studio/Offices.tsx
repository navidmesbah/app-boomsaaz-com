// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        // invert ? 'text-neutral-300' : 'text-neutral-600',
        // invert ? 'text-background' : 'text-muted-foreground',
        invert ? 'text-white' : 'text-white',
      )}
    >
      {/* <strong className={invert ? 'text-white' : 'text-neutral-950'}> */}
      {/* <strong className={invert ? 'text-background' : 'text-foreground'}> */}
      <strong className={invert ? 'text-white' : 'text-white'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="پوشش" invert={invert}>
          شیراز - تهران
          {/* <br /> */}
          {/* Pardis, Tehran, IRAN */}
        </Office>
      </li>
      <li>
        <Office name="تلفن" invert={invert}>
          <a href="tel:+989173206603" dir="ltr">0917-320-6603</a>
          {/* <br /> */}
          {/* <a href="tel:+989173206603" dir="ltr">0917-320-6603</a> */}
        </Office>
      </li>
    </ul>
  )
}
