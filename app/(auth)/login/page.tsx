//@ts-nocheck
'use client';

// import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useDebouncedCallback } from 'use-debounce';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';

import Form from 'next/form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    if (storedPhone) {
      setEmail(storedPhone);
    }

    if (state.status === 'failed') {
      toast.error('رمز معتبر نیست!');
    } else if (state.status === 'invalid_data') {
      toast.error('شماره موبایل یا رمز معتبر نیست!');
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      // Simple redirect - let the middleware handle it
      router.refresh();
    }

    if (state.otpCreatedAt) {
      const expiryTime = state.otpCreatedAt + 120 * 1000; // OTP expires in 120 seconds

      const updateTimer = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000)); // Avoid negative numbers
        setTimeLeft(remaining);
      };

      updateTimer(); // Initial sync
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
    }
  }, [state.status, state.otpCreatedAt, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('phone') as string);
    localStorage.setItem("phone", formData.get('phone'));
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">ورود به حساب کاربری</h3>
          {/* <p className="text-sm text-gray-500 dark:text-zinc-400">
            email: demo@boomsaaz.com/ pass: demodemo
          </p> */}
          <div>
            {timeLeft > 0 && <p>{timeLeft} ثانیه زمان برای ورود</p>}
          </div>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email} status={state.status} timeLeft={timeLeft}>
          <SubmitButton isSuccessful={isSuccessful}>ورود</SubmitButton>
          {/* <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' for free.'}
          </p> */}
        </AuthForm>
      </div>
    </div>
  );
}
