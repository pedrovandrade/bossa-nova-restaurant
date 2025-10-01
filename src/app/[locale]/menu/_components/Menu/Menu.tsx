import { type FC } from 'react';
import { getTranslations, getMessages } from 'next-intl/server';
import MenuDocumentPage, { MenuDocumentPageProps } from './MenuDocumentPage';
import Carrousel from '@/components/Carrousel';

const Menu: FC = async () => {
  const t = await getTranslations('pages.menu.description');
  const messages = await getMessages();

  // Fetch menu pages data from the API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
    cache: 'force-cache',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch menu data');
  }

  const menuPages: MenuDocumentPageProps[] = await response.json();

  const descriptionParagraphKeys = Object.keys(messages.pages.menu.description);

  return (
    <>
      <div className='w-full max-w-3xl mb-15 text-center text-xl text-bossanova-cyan px-6 md:px-0'>
        { descriptionParagraphKeys.map((paragraphKey) => (
          <p key={paragraphKey} className="">
            {t(paragraphKey)}
          </p>
        )) }
      </div>
      
      {/* Menu pages carrousel */}
      <Carrousel
        containerClass='min-h-[1086px] md:w-3xl'
        items={menuPages.map((props, index) => (
          <MenuDocumentPage key={index} {...props} />
        ))}
      />
    </>
  );
};

export default Menu;