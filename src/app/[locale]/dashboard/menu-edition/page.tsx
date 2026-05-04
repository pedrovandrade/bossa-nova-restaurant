import { FC } from 'react';
import { GetMenuResponse } from '@/app/api/menu/_repository';
import MenuEditor from './_components/MenuEditor';

const MenuEditionPage: FC = async () => {
  let menuData: GetMenuResponse | null = null;

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
        Menu edition
      </h1>
      { menuData
        ? <MenuEditor data={menuData} />
        : <p>Error in loading the menu data</p>
      }
    </div>
  );
};

export default MenuEditionPage;