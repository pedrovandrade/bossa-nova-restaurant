import { type FC } from 'react';
import { getTranslations, getMessages } from 'next-intl/server';
import FoodMenuPage from './FoodMenuPage';
import Carrousel from '@/components/Carrousel';
import type { MenuApiResponse } from '@/app/api/menu/route';
import DrinkMenuPage from './DrinkMenuPage';

const Menu: FC = async () => {
  const t = await getTranslations('pages.menu.description');
  const messages = await getMessages();

  // Fetch menu pages data from the API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch menu data');
  }

  const menuPagesData: MenuApiResponse = await response.json();
  const foodMenuPages = menuPagesData.foodPages.map((page, index) => (
    <FoodMenuPage key={`foodpage_${index}`} {...page} />
  ));
  const drinkMenuPages = menuPagesData.drinkPages.map((page, index) => (
    <DrinkMenuPage key={`drinkpage_${index}`} {...page} />
  ));

  const menuPages = [...drinkMenuPages, ...foodMenuPages];

  const descriptionParagraphKeys = Object.keys(messages.pages.menu.description);

  return (
    <>
      <div className='w-full max-w-3xl mb-15 text-center text-xl text-bossanova-cyan px-6 md:px-0'>
        { descriptionParagraphKeys.map((paragraphKey) => (
          <p key={paragraphKey} className='mb-4'>
            {t(paragraphKey)}
          </p>
        )) }
      </div>
      
      {/* Menu pages carrousel */}
      <Carrousel
        containerClass='min-h-[1086px] md:w-3xl'
        items={menuPages}
      />
    </>
  );
};

export default Menu;