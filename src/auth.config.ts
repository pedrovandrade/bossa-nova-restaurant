import type { NextAuthConfig } from 'next-auth';
import { routing } from '@/i18n/routing';
 
export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const locale = request.cookies.get('NEXT_LOCALE')?.value ?? 'fr';

      // protect any /{locale}/dashboard route
      const { locales } = routing;
      const localesRegex = locales.join('|');
      const dashboardMatch = pathname.match(new RegExp(`(?<=^\/(${localesRegex})\/)dashboard(?=([\/?].*|$))`));
      const loginMatch = pathname.match(new RegExp(`(?<=^\/(${localesRegex})\/)login(?=(\/|[?].*|$))`));
      if (dashboardMatch && !isLoggedIn) {
        return Response.redirect(new URL(`${locale}/login`, request.nextUrl.origin));
      }

      if (loginMatch && isLoggedIn) {
        return Response.redirect(new URL(`${locale}/dashboard`, request.nextUrl.origin));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;