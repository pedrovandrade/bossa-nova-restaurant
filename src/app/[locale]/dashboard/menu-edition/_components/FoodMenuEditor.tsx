import { FoodMenuPageData } from '@/types/FoodMenuPageData';
import { MenuHeaderIcon } from '@/components/_icons';
import { FC } from 'react';
import Title from './_common/Title';
import { FoodEditionParams, FoodFooterEditionParams, TitleEditionParams } from './MenuEditor';
import FoodItem from './_foodMenu/FoodItem';
import { defaultLocalizedTextArray } from './_utils/localizedTextService';
import FoodMenuFooter from './_foodMenu/FoodMenuFooter';

type FoodMenuEditorProps = {
  pageData: FoodMenuPageData;
  pageIndex: number;
  onTitleChange?: (params: TitleEditionParams) => void;
  onFoodChange?: (params: FoodEditionParams) => void;
  onFooterChange?: (params: FoodFooterEditionParams) => void;
};

const FoodMenuEditor: FC<FoodMenuEditorProps> = (props) => {
  const {
    pageData,
    pageIndex,
    onTitleChange,
    onFoodChange,
    onFooterChange,
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

        {/* Menu Items */}
        <ul className='tracking-wider'>
          {items.map((item, index) => {
            const { name, description, price } = item;
            return (
              <FoodItem
                key={`food-menu-item-${pageIndex}-${index}`}
                page={pageIndex}
                index={index}
                id={`food-menu-item-${pageIndex}-${index}`}
                name={name}
                description={description ?? defaultLocalizedTextArray}
                price={price}
                onFoodItemChange={onFoodChange}
              />
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
