'use client';

import { DrinkMenuPageData } from '@/types/DrinkMenuPageData';
import { MenuHeaderIcon } from '@/components/_icons';
import { FC } from 'react';
import Title from './_common/Title';
import { TitleEditionParams, CategoryEditionParams, DrinkEditionParams } from './MenuEditor';
import Category from './_drinkMenu/Category';
import DrinkItem from './_drinkMenu/DrinkItem';

type DrinkMenuEditorProps = {
  pageData: DrinkMenuPageData;
  pageIndex: number;
  onTitleChange?: (params: TitleEditionParams) => void;
  onCategoryChange?: (params: CategoryEditionParams) => void;
  onDrinkChange?: (params: DrinkEditionParams) => void;
};

const DrinkMenuEditor: FC<DrinkMenuEditorProps> = (props) => {
  const {
    pageData,
    pageIndex,
    onTitleChange,
    onCategoryChange,
    onDrinkChange
  } = props;
  const { title, items } = pageData;

  return (
    <section className='flex flex-col justify-between w-full bg-white pl-7 md:pl-20 pr-7 md:pr-30 py-7 text-bossanova-cyan'>
      <div>
        <div className='flex justify-center max-h-20 mb-4'>
          <MenuHeaderIcon />
        </div>
        <Title
          id='drink-menu-title'
          page={pageIndex}
          currentText={title}
          className='text-4xl font-medium text-center mb-6 font-(family-name:--font-feeling-passionate)'
          onTitleChange={onTitleChange}
        />

        {/* Menu Items */}
        {items.map((item, index) => {
          const inline = item.inline || false;

          return (
            <section key={index} className='mb-8 tracking-wider'>
              <Category
                page={pageIndex}
                index={index}
                title={item.category}
                id={`drink-menu-category-page-${pageIndex}-${index}`}
                note={item.note}
                onCategoryChange={onCategoryChange}
              />
              <ul className={inline ? 'flex justify-between' : ''}>
                {item.drinks.map((drink, drinkIndex) => {
                  const { description, name, price } = drink;

                  return (
                    <DrinkItem
                      key={`drink-menu-category-${pageIndex}-${index}-${drinkIndex}`}
                      page={pageIndex}
                      id={`drink-menu-category-${pageIndex}-${index}-${drinkIndex}`}
                      categoryIndex={index}
                      drinkIndex={drinkIndex}
                      name={name}
                      description={description}
                      price={price}
                      inline={inline}
                      onDrinkItemChange={onDrinkChange}
                    />
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default DrinkMenuEditor;