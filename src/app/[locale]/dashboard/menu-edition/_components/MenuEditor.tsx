'use client';

import { GetMenuResponse } from '@/app/api/menu/_repository';
import { FC, useState } from 'react';
import FoodMenuEditor from './FoodMenuEditor';
import DrinkMenuEditor from './DrinkMenuEditor';
import { LocalizedText, LocalizedTextArray } from '@/types/LocalizedText';
import DashboardForm from '@/app/_components/DashboardForm';

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

type FoodEditionParams = {
  page: number;
  index: number;
  /** Localized item name. */
  name: LocalizedText;
  /** Localized item description as an array of localized texts. */
  description?: LocalizedTextArray;
  /** Numeric price in euros. */
  price?: number;
};

type FoodFooterEditionParams = {
  page: number;
  notes?: LocalizedTextArray;
  generalNote?: LocalizedText;
};

type MenuEditorProps = {
  data: GetMenuResponse;
};

const MenuEditor: FC<MenuEditorProps> = ({ data }) => {
  const [menuPages, setMenuPages] = useState<GetMenuResponse>(data);

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

  const handleFoodTitleChange = (params: TitleEditionParams) => {
    const { page, newTitle } = params;

    setMenuPages((prev) => {
      const foodPages = [...prev.foodPages];
      if (foodPages[page]) {
        foodPages[page] = {
          ...foodPages[page],
          title: newTitle,
          lastUpdated: new Date(),
        };
      }
      return { ...prev, foodPages };
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

  const handleFoodItemChange = (params: FoodEditionParams) => {
    const { page, index, name, description, price } = params;

    setMenuPages((prev) => {
      const foodPages = [...prev.foodPages];
      const targetPage = foodPages[page];
      if (!targetPage) return prev;

      const items = Array.isArray(targetPage.items) ? [...targetPage.items] : [];
      const targetFood = items[index] ?? {};
      if (!targetFood) return prev;

      const updatedFood = {
        ...targetFood,
        name,
        description: description ?? targetFood.description,
        price,
      };

      items[index] = updatedFood;

      foodPages[page] = {
        ...targetPage,
        items,
        lastUpdated: new Date(),
      };

      return { ...prev, foodPages };
    });
  };

  const handleFoodPageFooterChange = (params: FoodFooterEditionParams) => {
    const { page, notes, generalNote } = params;

    setMenuPages((prev) => {
      const foodPages = [...prev.foodPages];
      const targetPage = foodPages[page];
      if (!targetPage) return prev;

      const newFooter = {
        notes,
        generalNote,
      };

      foodPages[page] = {
        ...targetPage,
        footer: newFooter,
        lastUpdated: new Date(),
      };

      return { ...prev, foodPages };
    });
  };

  const handleSubmit = async () => {
    console.log('Save changes');
  };

  return (
    // <div className='max-w-3xl mx-auto'>
    <div className=''>
      <DashboardForm
        onSubmit={handleSubmit}
      >
        {drinkPages.map((page, pageIndex) => (
          <div key={`drinkpageeditor_${pageIndex}`}>
            <h2 className='text-3xl font-bold my-5'>
              Page {pageIndex + 1}
            </h2>
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
            <h2 className='text-3xl font-bold py-5'>
              Page {numberOfDrinkPages + pageIndex + 1}
            </h2>
            <FoodMenuEditor
              pageData={page}
              pageIndex={pageIndex}
              onTitleChange={handleFoodTitleChange}
              onFoodChange={handleFoodItemChange}
              onFooterChange={handleFoodPageFooterChange}
            />
          </div>
        ))}
      </DashboardForm>
    </div>
  );
};

export default MenuEditor;
export type {
  TitleEditionParams,
  CategoryEditionParams,
  DrinkEditionParams,
  FoodEditionParams,
  FoodFooterEditionParams,
};