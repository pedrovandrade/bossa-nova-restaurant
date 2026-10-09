import PresentationBanner from '@/app/_components/PresentationBanner';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Menu from '@/pages/menu/_components/Menu';
import menuImageDesktop from '@/assets/images/menu-image-desktop.jpg';
import menuImageMobile from '@/assets/images/menu-image-mobile.jpg';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/app/lib/pageMetadata';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return createPageMetadata({
    locale,
    path: '/menu',
    title: t('menu.title'),
    description: t('menu.description'),
  });
}

const MenuPage: FC = () => {
  const t = useTranslations('pages.menu');
  return (
    <>
      <PresentationBanner
        title={t('presentationBanner.title')}
        description={t('presentationBanner.description')}
        mainImageFile={menuImageDesktop}
        mobileImageFile={menuImageMobile}
        heightPercent={60}
      />
      <div className="mx-auto my-16 w-screen md:w-auto">
        <Menu />
      </div>
    </>
  );
};

export default MenuPage;