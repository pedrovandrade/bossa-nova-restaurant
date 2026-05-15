'use client';

import { GetMenuResponse } from '@/app/api/menu/_repository';
import { FC, useState } from 'react';
import FoodMenuEditor from './FoodMenuEditor';
import DrinkMenuEditor from './DrinkMenuEditor';
import { LocalizedText, LocalizedTextArray } from '@/types/LocalizedText';
import DashboardForm from '@/components/DashboardForm';
import { useTranslations } from 'next-intl';

type TitleEditionParams = {
  page: number;
  newTitle: LocalizedText;
};

type CategoryEditionParams = {
  page: number;
  categoryIndex: number;
  newTitle: LocalizedText;
  inline: boolean;
  note?: {
    text: LocalizedText;
    inline?: boolean;
    bold?: boolean;
  };
};

type DrinkLocationParams = {
  page: number;
  categoryIndex: number;
  drinkIndex: number;
};

type DrinkEditionParams = DrinkLocationParams & {
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

type FoodLocationParams = {
  page: number;
  index: number;
};

type FoodEditionParams = FoodLocationParams & {
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

  const t = useTranslations('pages.dashboard.pages.menu');

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
    const { page, categoryIndex, inline, newTitle, note } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      const items = drinkPages[page]?.items;
      const updatedItems = items?.map((item, index) => {
        if (index === categoryIndex) {
          return ({
            ...item,
            category: newTitle,
            inline,
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

  const handleDrinkCategoryDelete = (params: { page: number; categoryIndex: number }) => {
    const { page, categoryIndex } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      const items = drinkPages[page]?.items;
      if (!items || categoryIndex < 0 || categoryIndex >= items.length) return prev;

      const updatedItems = [...items];
      updatedItems.splice(categoryIndex, 1);

      drinkPages[page] = {
        ...drinkPages[page],
        lastUpdated: new Date(),
        items: updatedItems,
      };

      return { ...prev, drinkPages };
    });
  };
  const handleDrinkCategoryAdd = (params: { page: number; categoryIndex: number }) => {
    const { page, categoryIndex } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      const items = drinkPages[page]?.items ? [...drinkPages[page].items] : [];
      const newCategory = {
        category: { fr: 'Nouvelle catégorie', en: 'New category', pt: 'Nova categoria' },
        drinks: [],
      };
      items.splice(categoryIndex, 0, newCategory);

      drinkPages[page] = {
        ...drinkPages[page],
        lastUpdated: new Date(),
        items,
      };

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

  const handleDrinkItemDelete = (params: DrinkLocationParams) => {
    const { page, categoryIndex, drinkIndex } = params;

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

      drinks.splice(drinkIndex, 1);
      items[categoryIndex] = { ...category, drinks };

      drinkPages[page] = {
        ...targetPage,
        items,
        lastUpdated: new Date(),
      };

      return { ...prev, drinkPages };
    });
  };

  const handleDrinkItemAdd = (params: { page: number; categoryIndex: number }) => {
    const { page, categoryIndex } = params;

    setMenuPages((prev) => {
      const drinkPages = [...prev.drinkPages];
      const targetPage = drinkPages[page];
      if (!targetPage) return prev;

      const items = Array.isArray(targetPage.items) ? [...targetPage.items] : [];
      const category = items[categoryIndex];
      if (!category) return prev;

      const drinks = Array.isArray(category.drinks) ? [...category.drinks] : [];
      const newDrink: Omit<DrinkEditionParams, keyof DrinkLocationParams> = {
        name: {
          text: { fr: 'Nouvelle boisson', en: 'New drink', pt: 'Nova bebida' },
          bold: false,
        },
        description: {
          text: { fr: '', en: '', pt: '' },
          bold: false,
          position: 'bottom',
          small: false,
        },
        price: 0,
      };
      drinks.push(newDrink);
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

  const handleFoodItemDelete = (params: FoodLocationParams) => {
    const { page, index } = params;

    setMenuPages((prev) => {
      const foodPages = [...prev.foodPages];
      const targetPage = foodPages[page];
      if (!targetPage) return prev;

      const items = Array.isArray(targetPage.items) ? [...targetPage.items] : [];
      if (index < 0 || index >= items.length) return prev;

      items.splice(index, 1);

      foodPages[page] = {
        ...targetPage,
        items,
        lastUpdated: new Date(),
      };

      return { ...prev, foodPages };
    });
  };

  const handleFoodItemAdd = (params: { page: number; categoryIndex: number }) => {
    const { page, categoryIndex } = params;

    setMenuPages((prev) => {
      const foodPages = [...prev.foodPages];
      const targetPage = foodPages[page];
      if (!targetPage) return prev;

      const items = Array.isArray(targetPage.items) ? [...targetPage.items] : [];
      const newFood: Omit<FoodEditionParams, keyof FoodLocationParams> = {
        name: { fr: 'Nouvel item', en: 'New item', pt: 'Novo item' },
        description: { fr: [''], en: [''], pt: [''] },
        price: 0,
      };
      items.splice(categoryIndex, 0, newFood);

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
    const { drinkPages, foodPages} = menuPages;

    const menuEditionResponse = await Promise.all([
      fetch('/api/menu/drinks', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(drinkPages),
      }),
      fetch('/api/menu/foods', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(foodPages),
      }),
    ]);

    const [drinksResponse, foodsResponse] = menuEditionResponse;

    if (!drinksResponse.ok || !foodsResponse.ok) {
      const errorMessage = await Promise.all([
        drinksResponse.text(),
        foodsResponse.text(),
      ]);
      throw new Error(errorMessage.join(' ') || 'Menu update failed');
    }
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
              {`${t('page')} ${pageIndex + 1}`}
            </h2>
            <DrinkMenuEditor
              pageData={page}
              pageIndex={pageIndex}
              onTitleChange={handleDrinkTitleChange}
              onCategoryChange={handleDrinkCategoryChange}
              onCategoryDelete={handleDrinkCategoryDelete}
              onCategoryAdd={handleDrinkCategoryAdd}
              onDrinkChange={handleDrinkItemChange}
              onDrinkItemDelete={handleDrinkItemDelete}
              onDrinkAdd={handleDrinkItemAdd}
            />
          </div>
        ))}
        {foodPages.map((page, pageIndex) => (
          <div key={`foodpageeditor_${pageIndex}`}>
            <h2 className='text-3xl font-bold py-5'>
              {`${t('page')} ${numberOfDrinkPages + pageIndex + 1}`}
            </h2>
            <FoodMenuEditor
              pageData={page}
              pageIndex={pageIndex}
              onTitleChange={handleFoodTitleChange}
              onFoodChange={handleFoodItemChange}
              onFooterChange={handleFoodPageFooterChange}
              onFoodItemDelete={handleFoodItemDelete}
              onFoodAdd={handleFoodItemAdd}
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
  DrinkLocationParams,
  DrinkEditionParams,
  FoodLocationParams,
  FoodEditionParams,
  FoodFooterEditionParams,
};