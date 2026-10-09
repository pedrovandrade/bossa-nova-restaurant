import type { Metadata } from 'next';
import { getSiteUrl } from '@/app/lib/siteUrl';
import restaurantOverviewDesktop from '@/assets/images/restaurant-overview-desktop.jpg';

const locales = ['fr', 'en', 'pt'] as const;
const openGraphLocales: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  pt: 'pt_BR',
};

type PageMetadataParams = {
  locale: string;
  path: string;
  title: string;
  description: string;
};

const createPageMetadata = ({ locale, path, title, description }: PageMetadataParams): Metadata => {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}${path}`;
  const languages = Object.fromEntries(
    locales.map((alternateLocale) => [alternateLocale, `${siteUrl}/${alternateLocale}${path}`])
  );

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${siteUrl}/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Bossa Nova Restaurant',
      locale: openGraphLocales[locale] ?? 'fr_FR',
      type: 'website',
      images: [restaurantOverviewDesktop.src],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [restaurantOverviewDesktop.src],
    },
  };
};

export { createPageMetadata };