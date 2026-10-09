import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.bossanova-toulouse.fr';
const locales = ['fr', 'en', 'pt'] as const;
const publicPaths = ['', '/about', '/menu', '/reservations', '/privacy-policy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    publicPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((alternateLocale) => [alternateLocale, `${siteUrl}/${alternateLocale}${path}`])
          ),
          'x-default': `${siteUrl}/fr${path}`,
        },
      },
    }))
  );
}