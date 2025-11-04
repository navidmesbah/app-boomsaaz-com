import NextAuth from 'next-auth';
import { authConfig } from '@/app/(auth)/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/customer/:path*',
    '/supplier/:path*',
    '/admin/:path*',
    '/driver/:path*',
    '/staff/:path*',
  ],
};
