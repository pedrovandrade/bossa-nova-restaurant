import { FC, PropsWithChildren } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import TranslationRichText from './TranslationRichText';

export type ContainerImageData = {
  file: StaticImageData | string,
  alt?: string,
  width?: number,
  height?: number,
  rightAligned?: boolean,
};

export type ContainerTextData = {
  prefix: string,
  key: string,
  title: string,
  content?: string[],
};

export type TextImageContainerProps = PropsWithChildren & {
  image: ContainerImageData,
  text: ContainerTextData,
};

const TextImageContainer: FC<TextImageContainerProps> = ({ image, text, children }) => {
  const [orderImage, orderText] = image.rightAligned ? ['order-1 md:order-2', 'order-1'] : ['order-2 md:order-1', 'order-2'];
  const t = useTranslations(text.prefix);

  return (
    <div className='w-full flex flex-col md:flex-row max-w-7xl mx-auto gap-10 md:gap-16 items-center'>
      <div className={`w-full md:w-1/2 ${orderImage}`}>
        <Image
          alt={image.alt || ''}
          src={image.file}
          width={image.width || 800}
          height={image.height || 1200}
        />
      </div>
      <section className={`w-full md:w-1/2 ${orderText}`}>
        <h2 className='font-semibold text-3xl text-bossanova-cyan mb-6'>
          {text.title}
        </h2>
        {text?.content?.map((contentKey) => (
          <TranslationRichText key={`contentKey-${contentKey}`}>
            {(tags) => t.rich(contentKey, tags)}
          </TranslationRichText>
        ))}
        {children}
      </section>
    </div>
  );
};

export default TextImageContainer;