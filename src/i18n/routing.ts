import { defineRouting } from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'en', 'pt'],
 
  // Used when no locale matches
  defaultLocale: 'fr',
  // localePrefix: 'as-needed',

  localeCookie: false, // Disable locale cookie
  localeDetection: false, // Disable automatic locale detection
});