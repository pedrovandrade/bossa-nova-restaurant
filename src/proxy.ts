import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default NextAuth(authConfig).auth((request: NextRequest) => {
  // Step 1: Use the incoming request (example)
  const defaultLocale = 'fr'; // Default locale
 
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: ['fr', 'en', 'pt'],
    defaultLocale
  });
  const response = handleI18nRouting(request);
 
  return response;
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$)/)', '/(fr|en|pt)/:path*']
};