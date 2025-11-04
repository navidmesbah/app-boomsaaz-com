//@ts-nocheck
import Form from 'next/form';

import { Input } from './ui/input';
import { Label } from './ui/label';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

export function AuthForm({
  // status,
  timeLeft,
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16 items-center">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="phone"
          className="text-zinc-600 font-normal dark:text-zinc-400 text-center"
        >
          شماره موبایل
        </Label>

        <div className='flex justify-center'>
          <Input
            id="phone"
            name="phone"
            className="bg-muted text-md md:text-sm w-[200px]"
            // type="email"
            type="tel"
            placeholder="0912..."
            // autoComplete="email"
            required
            autoFocus
            defaultValue={defaultEmail}
            dir='ltr'
          />
        </div>
      </div>

      {
        // (status === "sms_sent" || status === "new_user") &&
        timeLeft > 0 &&
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-zinc-600 font-normal dark:text-zinc-400 text-center"
          >
            رمز عبور
          </Label>

          {/* <Input
            id="password"
            name="password"
            className="bg-muted text-md md:text-sm"
            // type="password"
            required
            dir='ltr'
          /> */}
          <div dir="ltr" className="flex justify-center">
            <InputOTP
              maxLength={5}
              pattern={REGEXP_ONLY_DIGITS}
              id="password"
              name="password"
              required
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                {/* <InputOTPSlot index={5} /> */}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      }

      {children}
    </Form>
  );
}
