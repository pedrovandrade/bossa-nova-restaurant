import { FC } from 'react';
import Image, { type StaticImageData } from 'next/image';
import FadeInContainer from '@/app/_components/FadeInContainer';

type PresentationBannerProps = {
  title?: string,
  description?: string,
  mainImageFile: StaticImageData,
  mobileImageFile?: StaticImageData,
  heightPercent?: number,
};

const PresentationBanner: FC<PresentationBannerProps> = ({
  title,
  description,
  mainImageFile,
  mobileImageFile,
  heightPercent = 100
}) => {

  return (
    <div className="w-full flex items-center justify-center">
      <div className='absolute text-white text-shadow-[0_0_5px_rgb(0_0_0_/_0.5)] p-10 text-center md:text-left z-10'>
        <FadeInContainer direction='bottom' duration={3} displacement={80}>
          <h1 className='text-5xl font-bold'>
            {title}
          </h1>
          { description &&
            <p className='mt-6 sm:mt-2 text-2xl font-normal '>
              {description}
            </p>
          }
        </FadeInContainer>
      </div>

      { /* Background image with fixed position to cover the entire banner area */ }
      <div
        className='w-full [clip-path:inset(0_0_0_0)]'
        style={{ height: `calc(${heightPercent}vh - var(--spacing)*20*${heightPercent/100})` }}
      >
        <div className='fixed top-20 left-0 w-full h-full'>
          {/* Desktop view */}
          <Image
            src={mainImageFile}
            alt=''
            priority
            fill
            style={{objectFit: 'cover'}}
            className={ mobileImageFile ? `hidden md:block` : `block` }
          />
          {/* Mobile view */}
          { mobileImageFile &&
            <Image
              src={mobileImageFile}
              alt=''
              priority
              fill
              style={{objectFit: 'cover'}}
              className='block md:hidden'
            />
          }
        </div>
      </div>
    </div>
  );
}

export default PresentationBanner;