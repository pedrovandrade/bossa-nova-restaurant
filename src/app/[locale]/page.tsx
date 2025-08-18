import TextImageContainer, { TextImageContainerProps } from '@/app/_components/TextImageContainer/TextImageContainer';
import PresentationBanner from '../_homePageComponents/PresentationBanner';
import { useMessages } from 'next-intl';
import foodPhoto1 from '@assets/images/entree-plat-1.jpg';
import foodPhoto2 from '@assets/images/entree-plat-2.jpg';

type TextImageContainer = {
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
  const textImageContainers = messages.pages.home.textImageContainers as {[key: string]: TextImageContainer};

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

  return (
    <>
      <PresentationBanner />
      <div className='px-5 md:px-10 py-20 flex flex-col gap-28 w-full bg-orange-50'>
        {containerData.map((data, index) => (
          <TextImageContainer key={index} image={data.image} text={data.text} />
        ))}
      </div>
    </>
  );
}
