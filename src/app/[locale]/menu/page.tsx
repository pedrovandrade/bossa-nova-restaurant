import PresentationBanner from '@/app/_components/PresentationBanner';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Menu from '@/pages/menu/_components/Menu';
import menuImageDesktop from '@/assets/images/menu-image-desktop.jpg';
import menuImageMobile from '@/assets/images/menu-image-mobile.jpg';

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