//@ts-nocheck
'use server';

import { z } from 'zod';

import { updateUser, createUser, getUser } from '@/lib/db/queries';

import { signIn } from './auth';

import Kavenegar from 'kavenegar';

const api = Kavenegar.KavenegarApi({
  apikey: '547342785157514772306E61466730654B586351486C7561516670542F622B5852634D64756C71615455303D'
});

function generateOtp(): number {
  let otp = "";
  while (otp.length < 5) {
    let digit = Math.floor(Math.random() * 9) + 1; // Generates a digit between 1-9
    otp += digit.toString();
  }

  return otp;
  // return parseInt(otp, 10);
}

async function sendOtp(receptor: string, token: string) {
  return new Promise((resolve, reject) => {
    api.VerifyLookup({ receptor, token, template: "verification" }, (response, status) => {
      console.log("API Response:", response);
      console.log("API Status:", status);

      if (status === 200) resolve(response);
      else reject(new Error(`API failed with status: ${status}`));
    });
  });
}

const authFormSchema = z.object({
  // email: z.string().email(),
  phone: z.string().regex(/^0[0-9]{10}$/, "Invalid phone number. Must start with 0 and have 10 digits."),
  // password: z.string().min(6),
  // password: z.string(),
});

export interface LoginActionState {
  status: 'idle' | 'new' | 'sms' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      phone: formData.get('phone'),
      // password: formData.get('password'),
    });

    const [user] = await getUser(validatedData.phone);

    // console.log("user phone", user!.phone)

    if (!user) {
      // console.log("new user")
      // create user
      const gen = generateOtp();

      await createUser(validatedData.phone, gen);

      // await api.VerifyLookup({
      //   receptor: validatedData.phone,
      //   token: gen,
      //   template: "verification"
      // }, function (response, status) {
      //   console.log(response);
      //   console.log(status);
      // });

      await sendOtp(validatedData.phone, gen);

      return { status: 'new_user', otpCreatedAt: Date.now() };
    }

    // const otpCreatedAt = new Date("2025-01-31T08:21:13.150Z"); // Example timestamp from DB
    const otpCreatedAt = new Date(user.otpCreatedAt); // Example timestamp from DB
    const now = new Date();

    // Calculate difference in milliseconds
    const diffMs = now.getTime() - otpCreatedAt.getTime();

    // Convert to seconds
    const diffSeconds = Math.floor(diffMs / 1000);

    // Convert to minutes
    // const diffMinutes = Math.floor(diffSeconds / 60);

    // console.log(`OTP age: ${diffSeconds} seconds`);

    if (diffSeconds > 120) {
      // console.log("more than 120")

      const genn = generateOtp();

      await updateUser({ phone: validatedData.phone, otp: genn });

      // await api.VerifyLookup({
      //   receptor: validatedData.phone,
      //   token: genn,
      //   template: "verification"
      // }, function (response, status) {
      //   console.log(response);
      //   console.log(status);
      // });

      await sendOtp(validatedData.phone, genn);

      return { status: 'sms_sent', otpCreatedAt: Date.now() }
    }

    if (formData.get('password') !== null && formData.get('password').length > 4) {
      // console.log("Sign In")

      await signIn('credentials', {
        phone: validatedData.phone,
        otp: formData.get('password'),
        redirect: false,
      });

      return { status: 'success' };
    }

    return { status: 'sms_sent', otpCreatedAt: otpCreatedAt.getTime() }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
  | 'idle'
  | 'in_progress'
  | 'success'
  | 'failed'
  | 'user_exists'
  | 'invalid_data';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: 'user_exists' } as RegisterActionState;
    }
    await createUser(validatedData.email, validatedData.password);
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};
