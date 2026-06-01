import PresentationBanner from '@/app/_components/PresentationBanner';
import { useMessages, useTranslations } from 'next-intl';
import { FC } from 'react';
import TextImageContainer, { TextImageContainerProps } from '@/app/_components/TextImageContainer';
import reservationImageDesktop from '@/assets/images/reservation-image-desktop.jpg';
import reservationImageMobile from '@/assets/images/reservation-image-mobile.jpg';
import environmentCozy from '@/assets/images/environment-cozy.jpg';
import environmentExternal from '@/assets/images/environment-extenal.jpg';
import FadeInContainer from '@/app/_components/FadeInContainer';

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

const ReservationsPage: FC = () => {
  const messages = useMessages();
  const textImageContainers = messages.pages.reservations.textImageContainers as {[key: string]: TextImageContainerParams};

  const imageFiles = [
    environmentExternal,
    environmentCozy,
  ];

  const reservationUrl = 'https://www.google.com/maps/reserve/v/dine/c/pj35s-OGtJQ?source=pa&opi=89978449&hl=fr-FR&gei=rpR-aO20NrDX7M8PgqOHwQ0&sourceurl=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dbossa%2Bnova%2Btoulouse%26client%3Dsafari%26sca_esv%3D873f597c83ac3191%26rls%3Den%26ei%3DPLRraJrmLdSnkdUPjOT0qQo%26ved%3D0ahUKEwia9M_31qqOAxXUU6QEHQwyPaUQ4dUDCBA%26uact%3D5%26oq%3Dbossa%2Bnova%2Btoulouse%26gs_lp%3DEgxnd3Mtd2l6LXNlcnAiE2Jvc3NhIG5vdmEgdG91bG91c2UyDhAuGIAEGLADGMcBGK8BMgkQABiwAxgHGB4yCRAAGLADGAcYHjIJEAAYsAMYBxgeMgkQABiwAxgHGB4yCRAAGLADGAcYHjILEAAYgAQYsAMYogQyCBAAGLADGO8FSJUEUABYAHABeACQAQCYAQCgAQCqAQC4AQPIAQCYAgGgAhGYAwCIBgGQBgiSBwExoAcAsgcAuAcAwgcDMy0xyAcN%26sclient%3Dgws-wiz-serp&ihs=4';
  const phoneNumber = '+33567686479';

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
          prefix: `pages.reservations.textImageContainers.${key}.text.content`,
          key,
          title: data.text.title,
          content: Object.keys(data.text.content ?? {}),
          params: { reservationUrl, phoneNumber },
        },
      }
    }
  );

  const t = useTranslations('pages.reservations');

  return (
    <>
      <PresentationBanner
        title={t('presentationBanner.title')}
        description={t('presentationBanner.description')}
        mainImageFile={reservationImageDesktop}
        mobileImageFile={reservationImageMobile}
        heightPercent={60}
      />
      <div className='mx-auto my-16 w-screen md:w-auto'>
        <div className='px-5 md:px-10 py-20 flex flex-col gap-28 w-full'>
          {containerData.map((data, index) => {
            return (
              <FadeInContainer key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                <TextImageContainer image={data.image} text={data.text} />
              </FadeInContainer>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default ReservationsPage;