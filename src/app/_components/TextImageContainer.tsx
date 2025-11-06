import { type FC } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import I18nRichTextProcessor, { RichTextParams } from './I18nRichTextProcessor';

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
  params?: RichTextParams,
};

export type TextImageContainerProps = {
  image: ContainerImageData,
  text: ContainerTextData,
};

const TextImageContainer: FC<TextImageContainerProps> = ({ image, text }) => {
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
          <I18nRichTextProcessor key={`contentKey-${contentKey}`} params={text.params}>
            {(tags) => t.rich(contentKey, tags)}
          </I18nRichTextProcessor>
        ))}
      </section>
    </div>
  );
};

export default TextImageContainer;