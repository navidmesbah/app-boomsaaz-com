import { compare } from 'bcrypt-ts';
import NextAuth, { type DefaultSession, User as NextAuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { type JWT } from 'next-auth/jwt';

import { getUser } from '@/lib/db/queries';
import { UserRole, type User as DbUser } from '@/lib/db/schema';

import { authConfig } from './auth.config';

// Define our custom user type
export interface CustomUser {
  id: string;
  role: UserRole;
  phone: string;
}

// Define our custom token type that includes default JWT fields
export interface CustomToken extends JWT, CustomUser {}

// Extend the built-in session types
declare module 'next-auth' {
  interface User extends CustomUser {}
  
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      phone: string;
    } & DefaultSession['user']
  }
}

// Extend JWT type
declare module 'next-auth/jwt' {
  interface JWT extends CustomUser {}
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }): Promise<CustomToken> {
      // console.log('Auth Debug - JWT Callback Input:', { 
      //   token,
      //   user,
      //   hasUser: !!user
      // });

      // On initial sign in
      if (user && 'role' in user) {
        const customUser = user as CustomUser;
        const newToken: CustomToken = {
          ...token,
          id: customUser.id,
          role: customUser.role,
          phone: customUser.phone
        };
        // console.log('Auth Debug - New Token:', newToken);
        return newToken;
      }

      // For subsequent requests, verify token has required fields
      if (!token?.role || !token?.id || !token?.phone) {
        console.error('Invalid token state:', token);
        throw new Error('Invalid token state: missing required fields');
      }

      // console.log('Auth Debug - JWT Callback Output:', token);
      return token as CustomToken;
    },
    async session({ session, token }) {
      // console.log('Auth Debug - Session Callback Input:', {
      //   sessionBefore: session,
      //   token
      // });

      // Copy token data to session
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role as UserRole,
        phone: token.phone
      };

      // console.log('Auth Debug - Session Callback Output:', session);
      return session;
    }
  },
  providers: [
    Credentials({
      credentials: {},
      async authorize({ phone, otp }: any): Promise<CustomUser | null> {
        // console.log('Auth Debug - Authorize Start:', { phone, otp });
        
        const users = await getUser(phone);
        // console.log('Auth Debug - Found users:', users);
        
        if (users.length === 0) return null;
        if (otp !== users[0].otp) return null;
        
        const user = users[0];
        // console.log('Auth Debug - Authorized user:', user);
        
        const customUser: CustomUser = {
          id: user.id,
          role: user.role as UserRole,
          phone: user.phone
        };
        
        // console.log('Auth Debug - Returning user:', customUser);
        return customUser;
      },
    }),
  ],
});
