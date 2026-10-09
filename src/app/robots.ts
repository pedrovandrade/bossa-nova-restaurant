import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.bossanova-toulouse.fr';

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
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}