'use client';

import { GetMenuResponse } from '@/app/api/menu/_repository';
import { FC, useEffect, useState } from 'react';
import FoodMenuEditor from './FoodMenuEditor';
import DrinkMenuEditor from './DrinkMenuEditor';
import { LocalizedText } from '@/types/LocalizedText';

type TitleEditionParams = {
  page: number;
  newTitle: LocalizedText;
};

type CategoryEditionParams = {
  page: number;
  categoryIndex: number;
  newTitle: LocalizedText;
  note?: {
    text: LocalizedText;
    inline?: boolean;
    bold?: boolean;
  };
};

type DrinkEditionParams = {
  page: number;
  categoryIndex: number;
  drinkIndex: number;
  name: {
    text: LocalizedText;
    bold?: boolean;
  };
  description?: {
    text: LocalizedText;
    position?: 'top' | 'bottom' | 'inline';
    bold?: boolean;
    small?: boolean;
  };
  price?: number;
};

const MenuEditor: FC = () => {
  const [menuPages, setMenuPages] = useState<GetMenuResponse>({
    drinkPages: [],
    foodPages: [],
  });

  // Fetch menu pages data from the API
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`);
        if (!response.ok) {
          throw new Error(`Failed to fetch menu data: ${response.statusText}, status ${response.status}`);
        }
        const data: GetMenuResponse = await response.json();
        setMenuPages(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const numberOfDrinkPages = menuPages.drinkPages.length;
  const { foodPages, drinkPages } = menuPages;

  const handleDrinkTitleChange = (params: TitleEditionParams) => {
    const { page, newTitle } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      if (drinkPages[page]) {
        drinkPages[page] = {
          ...drinkPages[page],
          title: newTitle,
          lastUpdated: new Date(),
        };
      }
      return { ...prev, drinkPages };
    });
  };

  const handleDrinkCategoryChange = (params: CategoryEditionParams) => {
    const { page, categoryIndex, newTitle, note } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      const items = drinkPages[page]?.items;
      const updatedItems = items?.map((item, index) => {
        if (index === categoryIndex) {
          return ({
            ...item,
            category: newTitle,
            note: note,
          });
        }
        return item
      });

      if (updatedItems) {
        drinkPages[page] = {
          ...drinkPages[page],
          lastUpdated: new Date(),
          items: updatedItems,
        };
      }
      return { ...prev, drinkPages };
    });
  };

  const handleDrinkItemChange = (params: DrinkEditionParams) => {
    const { page, categoryIndex, drinkIndex, name, description, price } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      const targetPage = drinkPages[page];
      if (!targetPage) return prev;

      const items = Array.isArray(targetPage.items) ? [...targetPage.items] : [];
      const category = items[categoryIndex];
      if (!category) return prev;

      // category is expected to have a `drinks` array
      const drinks = Array.isArray(category.drinks) ? [...category.drinks] : [];
      if (drinkIndex < 0 || drinkIndex >= drinks.length) return prev;

      const existing = drinks[drinkIndex] ?? {};
      const updatedDrink = {
        ...existing,
        name,
        description: description ?? existing.description,
        price: typeof price !== 'undefined' ? price : existing.price,
      };

      drinks[drinkIndex] = updatedDrink;
      items[categoryIndex] = { ...category, drinks };

      drinkPages[page] = {
        ...targetPage,
        items,
        lastUpdated: new Date(),
      };

      return { ...prev, drinkPages };
    });
  };

  return (
    <div className='text-bossanova-cyan flex flex-col gap-7 w-full max-w-3xl mb-5 mx-auto'>
      {drinkPages.map((page, pageIndex) => (
        <div key={`drinkpageeditor_${pageIndex}`}>
          <h2 className='text-3xl font-bold my-5'>Page {pageIndex + 1}</h2>
          <DrinkMenuEditor
            pageData={page}
            pageIndex={pageIndex}
            onTitleChange={handleDrinkTitleChange}
            onCategoryChange={handleDrinkCategoryChange}
            onDrinkChange={handleDrinkItemChange}
          />
        </div>
      ))}
      {foodPages.map((page, pageIndex) => (
        <div key={`foodpageeditor_${pageIndex}`}>
          <h2 className='text-3xl font-bold py-5'>Page {numberOfDrinkPages + pageIndex + 1}</h2>
          <FoodMenuEditor {...page} />
        </div>
      ))}
      <div className='sticky bg-white bottom-0 w-full h-20 px-10 shadow-[0_-5px_10px_rgba(0,0,0,0.25)]'>
        <div className='flex gap-15 absolute right-10 top-1/2 -translate-y-1/2'>
          <button
            className='bg-bossanova-cyan text-white px-6 py-2 rounded-md hover:cursor-pointer hover:bg-bossanova-green focus:ring-2 focus:ring-bossanova-cyan focus:ring-opacity-50'
            onClick={() => console.log('Save changes')}
          >
            Save Changes
          </button>
          <button
            className='bg-bossanova-cyan text-white px-6 py-2 rounded-md hover:cursor-pointer hover:bg-bossanova-green focus:ring-2 focus:ring-bossanova-cyan focus:ring-opacity-50'
            onClick={() => console.log('Discard changes')}
          >
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;
export type { TitleEditionParams, CategoryEditionParams, DrinkEditionParams };