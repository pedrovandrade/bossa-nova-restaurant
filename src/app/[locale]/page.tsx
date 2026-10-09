import TextImageContainer, { TextImageContainerProps } from '@/components/TextImageContainer';
import PresentationBanner from '@/components/PresentationBanner';
import foodPhoto1 from '@/assets/images/entree-plat-1.jpg';
import foodPhoto2 from '@/assets/images/entree-plat-2.jpg';
import InstagramFeed from '@/components/InstagramFeed';
import FadeInContainer from '@/components/FadeInContainer';
import restaurantOverviewDesktop from '@/assets/images/restaurant-overview-desktop.jpg';
import restaurantOverviewMobile from '@/assets/images/restaurant-overview-mobile.jpg';
import OpeningHours from '@/app/_homePageComponents/OpeningHours';
import { getMessages, getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MarketingData } from '@/types/MarketingData';
import MarketingPopin from '@/components/MarketingPopin';
import { createPageMetadata } from '@/app/lib/pageMetadata';
import { getSiteUrl } from '@/app/lib/siteUrl';
import { getOpeningHours } from '@/app/api/openingHours/_repository';
import type { OpeningHoursData } from '@/types/OpeningHoursData';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return createPageMetadata({
    locale,
    path: '',
    title: t('home.title'),
    description: t('home.description'),
  });
}

type TextImageContainerParams = {
  image: {
    file: string,
    alt?: string,
    width?: number,
    height?: number,
    rightAligned?: boolean,
  },
  text: {
    title: string,
    content?: {[key: string]: string},
  },
};

export default async function Home() {
  const messages = await getMessages();
  const textImageContainers = messages.pages.home.textImageContainers as {[key: string]: TextImageContainerParams};

  const imageFiles = [
    foodPhoto1,
    foodPhoto2,
  ];

  const containerData: TextImageContainerProps[] = Object
    .entries(textImageContainers)
    .map(([key, data], index) => {
      return {
        image: {
          file: imageFiles[index],
          alt: data.image.alt,
          width: data.image.width,
          height: data.image.height,
          rightAligned: data.image.rightAligned,
        },
        text: {
          prefix: `pages.home.textImageContainers.${key}.text.content`,
          key,
          title: data.text.title,
          content: Object.keys(data.text.content ?? {}),
        },
      }
    }
  );

  const t = await getTranslations('pages.home');
  const seo = await getTranslations('seo');
  const locale = await getLocale();
  const siteUrl = getSiteUrl();
  const openingHours: OpeningHoursData | null = await getOpeningHours().catch(() => null);
  const openingDays = [
    ['monday', 'Monday'],
    ['tuesday', 'Tuesday'],
    ['wednesday', 'Wednesday'],
    ['thursday', 'Thursday'],
    ['friday', 'Friday'],
    ['saturday', 'Saturday'],
    ['sunday', 'Sunday'],
  ] as const;

  const restaurantStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#restaurant`,
    name: 'Bossa Nova Restaurant',
    url: `${siteUrl}/${locale}`,
    image: new URL(restaurantOverviewDesktop.src, siteUrl).toString(),
    description: seo('home.description'),
    telephone: '+33567686479',
    email: 'bossanovatoulouse@gmail.com',
    servesCuisine: ['Brazilian', 'Latin American'],
    acceptsReservations: true,
    hasMenu: `${siteUrl}/${locale}/menu`,
    openingHoursSpecification: openingHours
      ? openingDays.flatMap(([day, schemaDay]) => {
          const schedule = openingHours[day];
          if (!schedule.isOpen) return [];

          return schedule.timespans.map(({ begin, end }) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: `https://schema.org/${schemaDay}`,
            opens: begin,
            closes: end,
          }));
        })
      : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 bis Rue de May',
      postalCode: '31000',
      addressLocality: 'Toulouse',
      addressCountry: 'FR',
    },
  };

  let marketingData: MarketingData | null = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing`);
    marketingData = await response.json();
  } catch (error) {
    console.error('Error in retrieving the marketing data:', error);
  }

  const { instagram, popin } = marketingData ?? {};

  // Instagram marketing data
  const isInstagramActive = instagram?.active ?? false;
  const instagramFeedUrl = instagram?.url ?? '';

  // Popin marketing data
  const isPopinActive = popin?.active ?? false;
  const popinImage = popin?.image ?? '';
  const popinDescription = popin?.altText ?? {};

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData).replace(/</g, '\\u003c'),
        }}
      />
      <MarketingPopin
        isActive={isPopinActive}
        image={popinImage}
        description={popinDescription}
      />
      <PresentationBanner
        title={t('presentationBanner.title')}
        description={t("presentationBanner.description")}
        mainImageFile={restaurantOverviewDesktop}
        mobileImageFile={restaurantOverviewMobile}
      />
      <div className='px-5 md:px-10 py-20 flex flex-col gap-28 w-full'>
        {containerData.map((data, index) => (
          <FadeInContainer key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
            <TextImageContainer image={data.image} text={data.text} />
          </FadeInContainer>
        ))}
      </div>
      <OpeningHours/>
      {isInstagramActive &&
        <div className='px-5 md:px-10 py-20 flex flex-col items-center w-full'>
          <h2 className='font-semibold text-3xl text-bossanova-cyan mb-6'>
            {t('instagramFeed.title')}
          </h2>
          <InstagramFeed url={instagramFeedUrl} />
        </div>
      }
    </>
  );
}
