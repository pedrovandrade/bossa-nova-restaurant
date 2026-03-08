import { ChangeEventHandler, FC, useState } from 'react';
import EditorBox from '../_utils/EditorBox';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import LocalizedTextInput from '../_utils/LocalizedTextInput';
import { CurrentLocale, LocalizedText } from '@/types/LocalizedText';
import { type DrinkEditionParams } from '../MenuEditor';
import SwitchButton from '@/app/_components/SwitchButton';
import { RadioGroup } from 'radix-ui';

type DrinkName = {
  text: LocalizedText;
  bold?: boolean;
};

type Description = {
  text: LocalizedText;
  position?: 'top' | 'bottom' | 'inline';
  bold?: boolean;
  small?: boolean;
};

type DrinkItemProps = {
  page: number;
  id: string;
  categoryIndex: number;
  drinkIndex: number;
  name: DrinkName;
  description?: Description;
  price?: number;
  inline?: boolean,
  onDrinkItemChange?: (params: DrinkEditionParams) => void;
};

/* Small presentational Radio option component (keeps onValueChange non-inline) */
const RadioOption: FC<{ value: 'top' | 'bottom' | 'inline'; label: string }> = ({ value, label }) => {
  return (
    <div className='flex items-center'>
      <RadioGroup.Item
        value={value}
        className='w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center data-[state=checked]:bg-bossanova-cyan'
        aria-label={label}
      >
        <RadioGroup.Indicator className='w-2 h-2 bg-white rounded-full' />
      </RadioGroup.Item>
      <span className='ml-2 text-sm text-gray-700'>{label}</span>
    </div>
  );
};

const DrinkItem: FC<DrinkItemProps> = (props) => {
  const {
    page,
    id,
    categoryIndex,
    drinkIndex,
    name,
    description,
    price,
    inline,
    onDrinkItemChange,
  } = props;

  const [itemsInline, setItemsInline] = useState<boolean>(Boolean(inline));
  const [drinkName, setDrinkName] = useState<DrinkName>(name);
  const [drinkDescription, setDrinkDescription] = useState<Description | undefined>(description);
  const [itemPrice, setItemPrice] = useState<number | undefined>(price);

  const handleConfirm = () => {
    const allTextsEmpty: boolean = Object.values(drinkDescription?.text || {}).every(text => !text);
    const newDescription = allTextsEmpty ? undefined : drinkDescription;
    setDrinkDescription(newDescription);

    onDrinkItemChange?.({
      page,
      categoryIndex,
      drinkIndex,
      name: drinkName,
      description: newDescription,
      price: itemPrice,
    });
  };

  /**
   * Reset all states to initial value.
   */
  const handleCancel = () => {
    setItemsInline(Boolean(inline));
    setDrinkName(name);
    setDrinkDescription(description);
    setItemPrice(price);
  };

  const addDescription = () => {
    if (!drinkDescription) {
      setDrinkDescription({
        text: { en: '', fr: '', pt: '' },
        bold: false,
        position: 'bottom',
        small: false,
      })
    };
  };

  /** ------------------- Handlers ------------------- */
  /** ------------------------------------------------ */

  /** ************ Drink name ************ */
  const handleDrinkNameTextChange = (locale: CurrentLocale, value: string) => {
    setDrinkName({...drinkName, text: {...drinkName.text, [locale]: value}});
  };

  const handleDrinkNameBoldChange = (checked: boolean) => {
    setDrinkName((prev) => prev ? { ...prev, bold: checked } : prev);
  };

  
  /** ************ Drink description ************ */
  const handleDrinkDescriptionTextChange = (locale: CurrentLocale, value: string) => {
    setDrinkDescription({...drinkDescription, text: {...drinkDescription?.text, [locale]: value}});
  };

  const handleDrinkDescriptionBoldChange = (checked: boolean) => {
    setDrinkDescription((prev) => prev ? { ...prev, bold: checked } : prev);
  };

  const handleDrinkDescriptionSmallChange = (checked: boolean) => {
    setDrinkDescription((prev) => prev ? { ...prev, small: checked } : prev);
  };

  const handleDescriptionPositionChange = (value: 'top' | 'bottom' | 'inline') => {
    setDrinkDescription((prev) => (prev ? { ...prev, position: value } : prev));
    // ensure inline layout flag mirrors position choice for preview
    setItemsInline(value === 'inline');
  };

  /** ************ Drink price ************ */
  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setItemPrice(Number(e.target.value));
  };

  const formatMoney = (price: number): string => (
    price % 1 === 0 ? price.toFixed(0) : price.toFixed(2)
  );

  return (
    <EditorBox
      className='flex'
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      readContent={
        <li
          className={[
            'flex grow',
            itemsInline ? 'flex-row' : 'flex-col',
          ].join(' ')}
        >
          <div
            className={[
              'text-base',
              'tracking-wide',
              'text-bossanova-cyan',
              'flex',
              itemsInline ? 'gap-4' : 'justify-between w-full'
            ].join(' ')}
          >
            {/* Drink name (and description if description is inline)*/}
            <div className={drinkDescription?.position === 'inline' ? 'flex items-center' : '' }>
              <LocalizedTextDisplay
                className={drinkName.bold ? 'font-extrabold' : ''}
                localizedText={drinkName.text}
              />
              {drinkDescription?.position === 'inline' &&
                <>
                  <span className='pr-1'>: </span>
                  <LocalizedTextDisplay
                    className={[
                      drinkDescription.bold ? 'font-extrabold' : 'font-normal',
                      drinkDescription.small ? 'text-sm' : 'text-base',
                    ].join(' ')}
                    localizedText={drinkDescription.text}
                  />
                </>
              }
            </div>
            {/* Drink price */}
            {itemPrice &&
              <div className='font-extrabold inline-flex min-w-15 justify-end'>
                {formatMoney(itemPrice)} euros
              </div>
            }
          </div>
          {/* Drink description (if not inline) */}
          {drinkDescription?.text && drinkDescription?.position !== 'inline' &&
            <LocalizedTextDisplay
              className={[
                'my-1',
                drinkDescription?.bold ? 'font-extrabold' : 'font-normal',
                drinkDescription?.small ? 'text-xs' : 'text-sm',
                drinkDescription?.position === 'top' ? 'order-first mb-0' : '',
              ].join(' ')}
              localizedText={drinkDescription.text}
            />
          }
        </li>
      }
      editContent={
        <>
        <div className='flex flex-col'>
          <div
            className={[
              'tracking-wide',
              'text-bossanova-cyan',
              'flex flex-col md:flex-row',
              itemsInline ? 'gap-4' : 'justify-between w-full',
              drinkDescription?.position === 'top' ?'order-2' : 'order-1'
            ].join(' ')}
          >
            {/* Drink name (and description if description is inline)*/}
            <div className={drinkDescription?.position === 'inline' ? 'flex' : 'grow' }>
              <div className='flex flex-col mb-5'>
                <LocalizedTextInput
                  id={`${id}-name`}
                  bold={drinkName.bold}
                  className='text-base'
                  localizedText={drinkName.text}
                  onInputChange={handleDrinkNameTextChange}
                />
                <SwitchButton
                  label='Bold'
                  onCheckedChange={handleDrinkNameBoldChange}
                  defaultChecked={drinkName?.bold}
                />
              </div>
              {drinkDescription?.position === 'inline' &&
                <div className='flex flex-col grow'>
                  <LocalizedTextInput
                    id={`${id}-description`}
                    bold={drinkDescription.bold}
                    className={drinkDescription?.small ? 'text-sm' : 'text-base'}
                    localizedText={drinkDescription.text}
                    onInputChange={handleDrinkDescriptionTextChange}
                  />
                  <SwitchButton
                    label='Bold'
                    onCheckedChange={handleDrinkDescriptionBoldChange}
                    defaultChecked={drinkDescription?.bold}
                  />
                  <SwitchButton
                    label='Small'
                    onCheckedChange={handleDrinkDescriptionSmallChange}
                    defaultChecked={drinkDescription?.small}
                  />
                  {/* Radio group for selecting the description position */}
                  <div className='mt-3 ml-5'>
                    <RadioGroup.Root
                      className='flex gap-2'
                      value={drinkDescription.position ?? 'bottom'}
                      onValueChange={handleDescriptionPositionChange}
                      aria-label='Description position'
                    >
                      <RadioOption value='top' label='Top' />
                      <RadioOption value='inline' label='Inline' />
                      <RadioOption value='bottom' label='Bottom' />
                    </RadioGroup.Root>
                  </div>
                </div>
              }
            </div>
            {/* Drink price */}
            {itemPrice &&
              <div className='font-extrabold inline-flex min-w-15 justify-end'>
                <input
                  id={`${id}-price`}
                  className='pl-3 h-8 w-18 border border-gray-300 rounded-xl'
                  type='number'
                  value={itemPrice}
                  onChange={handlePriceChange}
                />
                <span className='pl-3'>euros</span>
              </div>
            }
          </div>
          {/* Drink description (if not inline) */}
          {drinkDescription?.text && drinkDescription?.position !== 'inline' &&
            <div className={drinkDescription?.position === 'top' ?'order-1' : 'order-2'}>
              <LocalizedTextInput
                id={`${id}-description`}
                bold={drinkDescription.bold}
                className={drinkDescription?.small ? 'text-sm' : 'text-base'}
                localizedText={drinkDescription.text}
                onInputChange={handleDrinkDescriptionTextChange}
              />
              <SwitchButton
                label='Bold'
                onCheckedChange={handleDrinkDescriptionBoldChange}
                defaultChecked={drinkDescription?.bold}
              />
              <SwitchButton
                label='Small'
                onCheckedChange={handleDrinkDescriptionSmallChange}
                defaultChecked={drinkDescription?.small}
              />
              {/* Radio group for selecting the description position */}
              <div className='my-3 ml-5'>
                <RadioGroup.Root
                  className='flex gap-2'
                  value={drinkDescription.position ?? 'bottom'}
                  onValueChange={handleDescriptionPositionChange}
                  aria-label='Description position'
                >
                  <RadioOption value='top' label='Top' />
                  <RadioOption value='inline' label='Inline' />
                  <RadioOption value='bottom' label='Bottom' />
                </RadioGroup.Root>
              </div>
            </div>
          }
          </div>
          {!drinkDescription?.text &&
            <div className='flex items-center gap-2 text-sm text-gray-500 italic'>
              <button
                className='text-teal-600 hover:underline hover:cursor-pointer'
                onClick={addDescription}
              >
                Add description
              </button>
            </div>
          }
        </>
      }
    />
  );
};

export default DrinkItem;