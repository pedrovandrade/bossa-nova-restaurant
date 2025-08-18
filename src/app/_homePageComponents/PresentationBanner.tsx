import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import restaurantOverview from '@assets/images/restaurant.jpg';

const PresentationBanner: FC = () => {
  const t = useTranslations('pages.home.presentationBanner');

  return (
    <div className="w-full flex items-center justify-center">
      <div className='absolute text-white text-shadow-[0_0_5px_rgb(0_0_0_/_0.5)] p-10 text-center md:text-left'>
        <h1 className='text-5xl font-bold'>
          {t('title')}
        </h1>
        <p className='mt-6 sm:mt-2 text-2xl font-normal '>
          {t('description')}
        </p>
      </div>

      { /* Background image with fixed position to cover the entire banner area */ }
      <div className='w-full h-[calc(100vh-var(--spacing)*20)] [clip-path:inset(0_0_0_0)] z-[-1]'>
        <div className='fixed top-0 left-0 w-full h-full'>
          <Image
            src={restaurantOverview}
            alt=""
            priority
            layout='fill'
            sizes='100vw'
            objectFit='cover'
          />
        </div>
      </div>
    </div>
  );
}

export default PresentationBanner;