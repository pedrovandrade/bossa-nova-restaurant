import { type FC } from 'react';
import { getTranslations, getMessages } from 'next-intl/server';
import FoodMenuPage from './FoodMenuPage';
import Carrousel from '@/components/Carrousel';
import type { GetMenuResponse } from '@/app/api/menu/_repository';
import DrinkMenuPage from './DrinkMenuPage';

const Menu: FC = async () => {
  const t = await getTranslations('pages.menu');
  const messages = await getMessages();

  // Fetch menu pages data from the API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu data: ${response.statusText}, status ${response.status}`);
  }

  const menuPagesData: GetMenuResponse = await response.json();
  const foodMenuPages = menuPagesData.foodPages.map((page, index) => (
    <FoodMenuPage key={`foodpage_${index}`} {...page} />
  ));
  const drinkMenuPages = menuPagesData.drinkPages.map((page, index) => (
    <DrinkMenuPage key={`drinkpage_${index}`} {...page} />
  ));

  const menuPages = [...drinkMenuPages, ...foodMenuPages];

  const descriptionParagraphKeys = Object.keys(messages.pages.menu.description);
  const lastUpdated = menuPagesData.lastUpdated ? new Date(menuPagesData.lastUpdated).toLocaleDateString('fr') : '-';

  return (
    <>
      <div className='w-full max-w-3xl mb-5 text-center text-xl text-bossanova-cyan px-6 md:px-0'>
        { descriptionParagraphKeys.map((paragraphKey) => (
          <p key={paragraphKey} className='mb-4'>
            {t(`description.${paragraphKey}`)}
          </p>
        )) }
      </div>

      <p className='text-center text-base text-bossanova-cyan py-6'>
        {t('lastUpdated')} {lastUpdated}
      </p>

      {/* Menu pages carrousel */}
      <Carrousel
        containerClass='min-h-[1086px] md:w-3xl'
        items={menuPages}
      />
    </>
  );
};

export default Menu;