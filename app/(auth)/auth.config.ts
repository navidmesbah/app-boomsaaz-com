import type { NextAuthConfig } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { UserRole } from '@/lib/db/schema';

// Define route access by role
const roleAccess = {
  [UserRole.ADMIN]: ['/admin', '/supplier', '/customer', '/driver'],
  [UserRole.STAFF]: ['/customer', '/supplier', '/driver'],
  [UserRole.SUPPLIER]: ['/supplier'],
  [UserRole.DRIVER]: ['/driver'],
  [UserRole.CUSTOMER]: ['/customer'],
};

// Public routes that don't require authentication
const publicPaths = {
  exact: ['/login', '/register', '/'],
  startsWith: ['/about', '/contact', '/pricing', '/terms', '/products', '/market', '/blog', '/api/auth']
};

const tokenOptions = {
  secure: process.env.NODE_ENV === 'production',
  cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
};

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  cookies: {
    sessionToken: {
      name: tokenOptions.cookieName,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: tokenOptions.secure
      }
    }
  },
  callbacks: {
    async authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      
      // Get decoded token with proper options
      const token = await getToken({ 
        req: request,
        secret: process.env.AUTH_SECRET,
        secureCookie: tokenOptions.secure,
        cookieName: tokenOptions.cookieName
      });

      // console.log('Debug - Auth Flow:', { 
      //   step: 'start', 
      //   pathname,
      //   auth: auth ? JSON.stringify(auth) : 'none',
      //   token: token ? JSON.stringify(token) : 'none',
      //   cookies: request.cookies.getAll().map(c => `${c.name}=${c.value.substring(0, 10)}...`),
      //   environment: process.env.NODE_ENV,
      //   cookieConfig: {
      //     name: tokenOptions.cookieName,
      //     secure: tokenOptions.secure
      //   }
      // });

      // Check for auth API routes first
      if (pathname.startsWith('/api/auth')) {
        // console.log('Debug - Auth Flow:', { 
        //   step: 'auth api route',
        //   result: 'allowed'
        // });
        return true;
      }

      // If we have a token and we're on an auth page, redirect to appropriate dashboard
      if ((pathname === '/login' || pathname === '/register') && token?.role) {
        const userRole = token.role as UserRole;
        const allowedPaths = roleAccess[userRole] || ['/customer'];
        const defaultRoute = allowedPaths[0];
        
        // console.log('Debug - Auth Flow:', { 
        //   step: 'auth page redirect',
        //   redirectTo: defaultRoute,
        //   role: userRole
        // });
        
        const redirectUrl = new URL(defaultRoute, request.nextUrl.origin);
        return Response.redirect(redirectUrl);
      }

      // Check for exact match public routes
      if (publicPaths.exact.includes(pathname)) {
        // console.log('Debug - Auth Flow:', { 
        //   step: 'public route check - exact', 
        //   result: 'allowed' 
        // });
        return true;
      }

      // Check for public route patterns
      if (publicPaths.startsWith.some(route => pathname.startsWith(route))) {
        // Make sure it's not a protected path
        const isProtectedPath = Object.values(roleAccess).flat().some(path => 
          pathname.startsWith(path)
        );
        
        if (!isProtectedPath) {
          // console.log('Debug - Auth Flow:', { 
          //   step: 'public route check - startsWith', 
          //   result: 'allowed' 
          // });
          return true;
        }
      }

      // If no token, deny access to protected routes
      if (!token) {
        // console.log('Debug - Auth Flow:', { 
        //   step: 'auth check', 
        //   result: 'denied - no token',
        //   cookies: request.cookies.getAll().map(c => c.name)
        // });
        return false;
      }

      // Get user's role and allowed paths from token
      const userRole = token.role as UserRole;
      const allowedPaths = roleAccess[userRole] || ['/customer'];
      
      // console.log('Debug - Auth Flow:', { 
      //   step: 'role check',
      //   userRole,
      //   allowedPaths,
      //   pathname
      // });

      // Check if user has access to the requested path
      const hasAccess = allowedPaths.some(path => pathname.startsWith(path));
      // console.log('Debug - Auth Flow:', { 
      //   step: 'access check',
      //   result: hasAccess ? 'allowed' : 'denied' 
      // });

      return hasAccess;
    },
  },
  providers: [], // Configured in auth.ts
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
};
