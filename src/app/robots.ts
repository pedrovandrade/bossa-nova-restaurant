import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/app/lib/siteUrl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/login',
        '/fr/dashboard',
        '/fr/login',
        '/en/dashboard',
        '/en/login',
        '/pt/dashboard',
        '/pt/login',
      ],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}