import type { MetadataRoute } from 'next';
import { getMenu } from '@/app/api/menu/_repository';
import { getSiteUrl } from '@/app/lib/siteUrl';

const locales = ['fr', 'en', 'pt'] as const;
const publicPages = [
  { path: '', priority: 1, changeFrequency: 'monthly' },
  { path: '/menu', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/reservations', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
] as const;

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const menu = await getMenu().catch(() => null);
  const lastModified = menu?.lastUpdated ? new Date(menu.lastUpdated) : undefined;
  const validLastModified = lastModified && !Number.isNaN(lastModified.getTime())
    ? lastModified
    : undefined;

  return locales.flatMap((locale) =>
    publicPages.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}/${locale}${path}`,
      priority,
      changeFrequency,
      ...(path === '/menu' && validLastModified ? { lastModified: validLastModified } : {}),
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