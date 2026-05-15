import { FC } from 'react';
import { GetMenuResponse } from '@/app/api/menu/_repository';
import MenuEditor from './_components/MenuEditor';
import { getTranslations } from 'next-intl/server';

const MenuEditionPage: FC = async () => {
  let menuData: GetMenuResponse | null = null;

  const t = await getTranslations('pages.dashboard.pages.menu');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`);
    if (!response.ok) {
      throw new Error(`Failed to fetch menu data: ${response.statusText}, status ${response.status}`);
    }
    menuData = await response.json();
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }

  return (
    <div className='py-8 w-full'>
      <h1 className='text-4xl font-bold mb-4 flex justify-center'>
        {t('title')}
      </h1>
      { menuData
        ? <MenuEditor data={menuData} />
        : <p>{t('errorMessage')}</p>
      }
    </div>
  );
};

export default MenuEditionPage;