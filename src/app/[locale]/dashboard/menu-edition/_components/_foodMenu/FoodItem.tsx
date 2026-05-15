import { CurrentLocale, LocalizedText, LocalizedTextArray } from '@/types/LocalizedText';
import { ChangeEventHandler, FC, useState } from 'react';
import EditorBox from '../_utils/EditorBox';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import LocalizedTextInput from '../_utils/LocalizedTextInput';
import type { FoodEditionParams, FoodLocationParams } from '../MenuEditor';
import { localizedTextArraysToText, localizedTextToTextArrays } from '../_utils/localizedTextService';

type FoodItemProps = {
  page: number;
  id: string;
  index: number;
  name: LocalizedText;
  /** Localized item description as an array of localized texts. */
  description: LocalizedTextArray;
  /** Numeric price in euros. */
  price?: number;
  onChange?: (params: FoodEditionParams) => void;
  onDelete?: (params: FoodLocationParams) => void;
};

const FoodItem: FC<FoodItemProps> = (props) => {
  const {
    page,
    id,
    index,
    name,
    description,
    price,
    onChange,
    onDelete,
  } = props;

  const descriptionParagraphs = localizedTextArraysToText(description);

  const [foodName, setFoodName] = useState<LocalizedText>(name);
  const [foodDescription, setFoodDescription] = useState<LocalizedText>(descriptionParagraphs);
  const [itemPrice, setItemPrice] = useState<number | undefined>(price);

  /** ------------------- Handlers ------------------- */
  /** ------------------------------------------------ */

  /** ************ Food name ************ */
  const handleFoodNameChange = (locale: CurrentLocale, value: string) => {
    setFoodName({...foodName, [locale]: value});
  };
  
  /** ************ Food description ************ */
  const handleFoodDescriptionChange = (locale: CurrentLocale, value: string) => {
    setFoodDescription({...foodDescription, [locale]: value});
  };

  /** ************ Food price ************ */
  const handleFoodPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newPrice = Number(e.target.value);
    if (!isNaN(newPrice)) {
      setItemPrice(newPrice);
    } else {
      setItemPrice(undefined);
    }
  };

  const formatMoney = (price: number): string => (
    price % 1 === 0 ? price.toFixed(0) : price.toFixed(2)
  );

  /** ************ Form actions ************ */
  const handleConfirm = () => {
    const descriptionArrays = localizedTextToTextArrays(foodDescription);
    onChange?.({
      page,
      index,
      name: foodName,
      description: descriptionArrays,
      price: itemPrice,
    });
  };

  const handleDelete = () => {
    onDelete?.({ page, index });
  };

  /**
   * Reset all states to initial value.
   */
  const handleCancel = () => {
    setFoodName(name);
    setFoodDescription(descriptionParagraphs);
    setItemPrice(price);
  };

  return (
    <li key={index} className='py-4'>
      <EditorBox
        className='flex'
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onDelete={handleDelete}
        readContent={
          <div className='grow'>
            <div className='flex justify-between text-xl font-extrabold text-bossanova-orange uppercase tracking-widest'>
              <LocalizedTextDisplay
                localizedText={name}
              />
              { price && <span>{formatMoney(price)} euros</span> }
            </div>
            <LocalizedTextDisplay
              className='mt-1 text-sm'
              localizedText={description}
            />
          </div>
        }
        editContent={
          <>
            <div className='text-xl font-extrabold text-bossanova-orange uppercase tracking-widest flex flex-col md:flex-row gap-4 order-1'>
              <div className='grow'>
                <LocalizedTextInput
                  localizedText={foodName}
                  id={`${id}-${page}-${index}-name`}
                  onInputChange={handleFoodNameChange}
                />
              </div>
              <div className='font-extrabold inline-flex min-w-15 justify-end'>
                <input
                  id={`${id}-price`}
                  className='pl-3 h-8 w-18 border border-gray-300 rounded-xl'
                  type='number'
                  value={itemPrice}
                  onChange={handleFoodPriceChange}
                />
                <span className='pl-3'>euros</span>
              </div>
            </div>
            <LocalizedTextInput
              className='mt-1 text-sm'
              localizedText={foodDescription}
              id={`${id}-description`}
              multiline={true}
              onInputChange={handleFoodDescriptionChange}
            />
          </>
        }
      />
    </li>
  );
};

export default FoodItem;