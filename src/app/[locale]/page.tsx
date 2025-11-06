import TextImageContainer, { TextImageContainerProps } from '@/components/TextImageContainer';
import PresentationBanner from '@/components/PresentationBanner';
import { useMessages, useTranslations } from 'next-intl';
import foodPhoto1 from '@/assets/images/entree-plat-1.jpg';
import foodPhoto2 from '@/assets/images/entree-plat-2.jpg';
import InstagramFeed from '@/app/_homePageComponents/InstagramFeed';
import FadeInContainer from '@/components/FadeInContainer';
import restaurantOverviewDesktop from '@/assets/images/restaurant-overview-desktop.jpg';
import restaurantOverviewMobile from '@/assets/images/restaurant-overview-mobile.jpg';

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

export default function Home() {
  const messages = useMessages();
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

  const t = useTranslations('pages.home');

  return (
    <>
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
      <div className='px-5 md:px-10 py-20 flex flex-col items-center w-full'>
        <h2 className='font-semibold text-3xl text-bossanova-cyan mb-6'>
          {t('instagramFeed.title')}
        </h2>
        <InstagramFeed path='p/DOdu1maDNVM' />
      </div>
    </>
  );
}
