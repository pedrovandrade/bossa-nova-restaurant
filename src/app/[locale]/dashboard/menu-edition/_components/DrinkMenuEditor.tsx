'use client';

import { DrinkMenuPageData } from '@/types/DrinkMenuPageData';
import { Cross, MenuHeaderIcon } from '@/components/_icons';
import React, { FC } from 'react';
import Title from './_common/Title';
import { TitleEditionParams, CategoryEditionParams, DrinkEditionParams, DrinkLocationParams } from './MenuEditor';
import Category from './_drinkMenu/Category';
import DrinkItem from './_drinkMenu/DrinkItem';
import SwitchButton from '@/app/_components/SwitchButton';
import { useTranslations } from 'next-intl';

type DrinkMenuEditorProps = {
  pageData: DrinkMenuPageData;
  pageIndex: number;
  onTitleChange?: (params: TitleEditionParams) => void;
  onCategoryChange?: (params: CategoryEditionParams) => void;
  onCategoryDelete?: (params: { page: number; categoryIndex: number }) => void;
  onCategoryAdd?: (params: { page: number; categoryIndex: number }) => void;
  onDrinkChange?: (params: DrinkEditionParams) => void;
  onDrinkItemDelete?: (params: DrinkLocationParams) => void;
  onDrinkAdd?: (params: { page: number; categoryIndex: number }) => void;
};

const DeleteCategoryButton = (
  props: {
    label: string,
    pageIndex: number,
    categoryIndex: number,
    onCategoryDelete?: (params: { page: number; categoryIndex: number }) => void
  }
) => {
  const { label, pageIndex, categoryIndex, onCategoryDelete } = props;
  return (
    <div className='relative w-full h-0.25 flex justify-end'>
      <button
        type='button'
        className={[
            'p-0.5',
            'h-6',
            'min-h-6',
            'w-6',
            'min-w-6',
            'text-white',
            'hover:cursor-pointer',
            'hover:bg-cyan-800',
            'bg-cyan-600',
            'rounded-full',
            'relative',
            '-top-4',
            '-right-4',
          ].join(' ')
        }
        aria-label={label}
        onClick={(event) => {
          event.preventDefault();
          onCategoryDelete?.({ page: pageIndex, categoryIndex });
        }}
      >
        <Cross />
      </button>
    </div>
  );
};

const AddCategoryButton = (
  props: {
    label: string,
    pageIndex: number,
    categoryIndex: number,
    onCategoryAdd?: (params: { page: number; categoryIndex: number }) => void
  }
) => {
  const { label, pageIndex, categoryIndex, onCategoryAdd } = props;
  return (
    <button
      type='button'
      className={[
          'py-1.5',
          'text-cyan-600',
          'hover:text-cyan-800',
          'hover:cursor-pointer',
          'hover:font-semibold',
          'bg-white',
          'rounded-full',
          'flex',
          'items-center',
          'gap-2',
        ].join(' ')
      }
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        onCategoryAdd?.({ page: pageIndex, categoryIndex });
      }}
    >
      <Cross className='h-3 w-3 rotate-45' />
      {label}
    </button>
  );
};

const AddDrinkButton = (
  props: {
    label: string,
    pageIndex: number,
    categoryIndex: number,
    onDrinkAdd?: (params: { page: number; categoryIndex: number }) => void
  }
) => {
  const { label, pageIndex, categoryIndex, onDrinkAdd } = props;
  return (
    <button
      type='button'
      className={[
          'py-1',
          'text-sm',
          'text-cyan-600',
          'hover:text-cyan-800',
          'hover:cursor-pointer',
          'hover:font-semibold',
          'flex',
          'items-center',
          'gap-2',
        ].join(' ')
      }
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        onDrinkAdd?.({ page: pageIndex, categoryIndex });
      }}
    >
      <Cross className='h-3 w-3 rotate-45' />
      {label}
    </button>
  );
};

const DrinkMenuEditor: FC<DrinkMenuEditorProps> = (props) => {
  const {
    pageData,
    pageIndex,
    onTitleChange,
    onCategoryChange,
    onCategoryDelete,
    onCategoryAdd,
    onDrinkChange,
    onDrinkItemDelete,
    onDrinkAdd,
  } = props;
  const { title, items } = pageData;

  const t = useTranslations('pages.dashboard.pages.menu.drinkMenu');

  const handleDrinkCategoryInlineChange = (inline: boolean, index: number) => {
    onCategoryChange?.({
      page: pageIndex,
      categoryIndex: index,
      newTitle: title, // Title doesn't change when toggling inline, so we pass the current title
      inline,
    });
  };

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

        <AddCategoryButton
          label={t('addCategory')}
          pageIndex={pageIndex}
          categoryIndex={0}
          onCategoryAdd={onCategoryAdd}
        />

        {/* Menu Items */}
        {items.map((item, index) => {
          const inline = item.inline || false;

          return (
            <React.Fragment key={`${item.category.fr}-${index}`}>
              <section
                className='mt-8 tracking-wider border border-dashed border-cyan-600 p-1'
              >
                <DeleteCategoryButton
                  label={t('deleteCategory')}
                  pageIndex={pageIndex}
                  categoryIndex={index}
                  onCategoryDelete={onCategoryDelete}
                />
                <Category
                  page={pageIndex}
                  index={index}
                  title={item.category}
                  id={`drink-menu-category-page-${pageIndex}-${index}`}
                  note={item.note}
                  onCategoryChange={onCategoryChange}
                />
                <SwitchButton
                  label={t('inlineItems')}
                  id={`drink-category-inline-${pageIndex}-${index}`}
                  onCheckedChange={(isInline) => handleDrinkCategoryInlineChange(isInline, index)}
                  defaultChecked={inline}
                />
                <ul className={inline ? 'flex justify-between flex-wrap' : ''}>
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
                        onChange={onDrinkChange}
                        onDelete={onDrinkItemDelete}
                      />
                    );
                  })}
                  <AddDrinkButton
                    label={t('addDrink')}
                    pageIndex={pageIndex}
                    categoryIndex={index}
                    onDrinkAdd={onDrinkAdd}
                  />
                </ul>
              </section>

              <AddCategoryButton
                label={t('addCategory')}
                pageIndex={pageIndex}
                categoryIndex={index + 1}
                onCategoryAdd={onCategoryAdd}
              />

            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default DrinkMenuEditor;