import I18nRichTextProcessor from '@/app/_components/I18nRichTextProcessor';
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import ownersPicture from '@/assets/images/owners-picture.jpg';
import FadeInContainer from '@/app/_components/FadeInContainer';

const AboutPage: FC = () => {
  const messages = useMessages();
  const paragraphMap = messages.pages.about.textParagraphs as {[key: string]: string};

  const paragraphKeys: string[] = Object.keys(paragraphMap);

  const t = useTranslations('pages.about.textParagraphs');

  return (
    <div className='mx-auto w-screen md:w-auto'>
      <div className='w-full max-w-xl'>
        <FadeInContainer
          direction='bottom'
        >
          <Image
            alt={''}
            src={ownersPicture}
            width={800}
            height={1200}
          />
        </FadeInContainer>
      </div>
      <div className='px-5 md:px-0 py-20 flex flex-col gap-1 w-full max-w-xl'>
        {paragraphKeys.map((paragraphKey) => (
          <FadeInContainer key={`paragraphKey-${paragraphKey}`}>
            <I18nRichTextProcessor className='mb-4'>
              {(tags) => t.rich(paragraphKey, tags)}
            </I18nRichTextProcessor>
          </FadeInContainer>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;