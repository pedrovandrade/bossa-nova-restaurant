import { FoodMenuPageData } from '@/types/FoodMenuPageData';
import { Cross, MenuHeaderIcon } from '@/components/_icons';
import { FC } from 'react';
import Title from './_common/Title';
import type {
  FoodEditionParams,
  FoodFooterEditionParams,
  FoodLocationParams,
  TitleEditionParams,
} from './MenuEditor';
import FoodItem from './_foodMenu/FoodItem';
import { defaultLocalizedTextArray } from './_utils/localizedTextService';
import FoodMenuFooter from './_foodMenu/FoodMenuFooter';
import React from 'react';
import { useTranslations } from 'next-intl';

type FoodMenuEditorProps = {
  pageData: FoodMenuPageData;
  pageIndex: number;
  onTitleChange?: (params: TitleEditionParams) => void;
  onFoodChange?: (params: FoodEditionParams) => void;
  onFooterChange?: (params: FoodFooterEditionParams) => void;
  onFoodItemDelete?: (params: FoodLocationParams) => void;
  onFoodAdd?: (params: { page: number; categoryIndex: number }) => void;
};

const AddFoodButton = (
  props: {
    pageIndex: number,
    categoryIndex: number,
    onFoodAdd?: (params: { page: number; categoryIndex: number }) => void
  }
) => {
  const { pageIndex, categoryIndex, onFoodAdd } = props;

  const t = useTranslations('pages.dashboard.pages.menu.foodMenu');

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
      aria-label={t('addFood')}
      onClick={(event) => {
        event.preventDefault();
        onFoodAdd?.({ page: pageIndex, categoryIndex });
      }}
    >
      <Cross className='h-3 w-3 rotate-45' />
      {t('addFood')}
    </button>
  );
};

const FoodMenuEditor: FC<FoodMenuEditorProps> = (props) => {
  const {
    pageData,
    pageIndex,
    onTitleChange,
    onFoodChange,
    onFoodItemDelete,
    onFooterChange,
    onFoodAdd,
  } = props;
  const { title, items, footer } = pageData;

  return (
    <section className="flex flex-col justify-between w-full bg-white pl-7 md:pl-20 pr-7 md:pr-30 py-7 text-bossanova-cyan">
      <div>
        <div className='flex justify-center max-h-20 mb-4'>
          <MenuHeaderIcon />
        </div>
        <Title
          id='food-menu-title'
          page={pageIndex}
          currentText={title}
          className='text-4xl font-medium text-center mb-6 font-(family-name:--font-feeling-passionate)'
          onTitleChange={onTitleChange}
        />

        <AddFoodButton
          pageIndex={pageIndex}
          categoryIndex={0}
          onFoodAdd={onFoodAdd}
        />

        {/* Menu Items */}
        <ul className='tracking-wider'>
          {items.map((item, index) => {
            const { name, description, price } = item;
            const foodName = name?.en?.toLowerCase().replace(/\s+/g, '-') || `no-food-name-${index}`;

            return (
              <React.Fragment key={`food-menu-item-${foodName}-${pageIndex}-${index}`}>
                <FoodItem
                  page={pageIndex}
                  index={index}
                  id={`food-menu-item-${foodName}-${pageIndex}-${index}`}
                  name={name}
                  description={description ?? defaultLocalizedTextArray}
                  price={price}
                  onChange={onFoodChange}
                  onDelete={onFoodItemDelete}
                />
                <AddFoodButton
                  pageIndex={pageIndex}
                  categoryIndex={index + 1}
                  onFoodAdd={onFoodAdd}
                />
              </React.Fragment>
          );
        })}
      </ul>
    </div>

      {/* Footer notes */}
      <FoodMenuFooter
        page={pageIndex}
        footerData={footer}
        onChange={onFooterChange}
      />
    </section>
  );
};

export default FoodMenuEditor;
