import { ChangeEventHandler, FC, useState } from 'react';
import EditorBox from '../_utils/EditorBox';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import LocalizedTextInput from '../_utils/LocalizedTextInput';
import { CurrentLocale, LocalizedText } from '@/types/LocalizedText';
import { type DrinkLocationParams, type DrinkEditionParams } from '../MenuEditor';
import SwitchButton from '@/components/SwitchButton';
import { RadioGroup } from 'radix-ui';
import { useTranslations } from 'next-intl';

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
  onChange?: (params: DrinkEditionParams) => void;
  onDelete?: (params: DrinkLocationParams) => void;
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
    onChange,
    onDelete,
  } = props;

  const t = useTranslations('pages.dashboard.pages.menu');

  const [itemsInline, setItemsInline] = useState<boolean>(Boolean(inline));
  const [drinkName, setDrinkName] = useState<DrinkName>(name);
  const [drinkDescription, setDrinkDescription] = useState<Description | undefined>(description);
  const [itemPrice, setItemPrice] = useState<number | undefined>(price);

  const handleConfirm = () => {
    const allTextsEmpty: boolean = Object.values(drinkDescription?.text || {}).every(text => !text);
    const newDescription = allTextsEmpty ? undefined : drinkDescription;
    setDrinkDescription(newDescription);

    onChange?.({
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

  const handleDelete = () => {
    onDelete?.({
      page,
      categoryIndex,
      drinkIndex,
    });
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

  return (
    <EditorBox
      className={`flex flex-col md:flex-row ${inline ? 'max-w-auto sm:max-w-1/2' : ''}`}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onDelete={handleDelete}
      readContent={
        <li
          className={[
            'flex grow',
            inline ? 'flex-row gap-2' : 'flex-col',
          ].join(' ')}
        >
          <div
            className={[
              'text-base',
              'tracking-wide',
              'text-bossanova-cyan',
              'flex',
              inline ? 'gap-2 md:gap-4' : 'justify-between w-full'
            ].join(' ')}
          >
            {/* Drink name (and description if description is inline)*/}
            <div className={description?.position === 'inline' ? 'flex items-center' : '' }>
              <LocalizedTextDisplay
                className={name.bold ? 'font-extrabold' : ''}
                localizedText={name.text}
              />
              {description?.position === 'inline' &&
                <>
                  <span className='pr-1'>: </span>
                  <LocalizedTextDisplay
                    className={[
                      description.bold ? 'font-extrabold' : 'font-normal',
                      description.small ? 'text-sm' : 'text-base',
                    ].join(' ')}
                    localizedText={description.text}
                  />
                </>
              }
            </div>
            {/* Drink price */}
            {price &&
              <div className='font-extrabold inline-flex min-w-15 justify-end'>
                {formatMoney(price)} euros
              </div>
            }
          </div>
          {/* Drink description (if not inline) */}
          {description?.text && description?.position !== 'inline' &&
            <LocalizedTextDisplay
              className={[
                'my-1',
                description?.bold ? 'font-extrabold' : 'font-normal',
                description?.small ? 'text-xs' : 'text-sm',
                description?.position === 'top' ? 'order-first mb-0' : '',
              ].join(' ')}
              localizedText={description.text}
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
              <div className={drinkDescription?.position === 'inline' ? 'flex grow' : 'grow' }>
                <div className='flex flex-col grow mb-5'>
                  <LocalizedTextInput
                    id={`${id}-name`}
                    bold={drinkName.bold}
                    className='text-base'
                    localizedText={drinkName.text}
                    legend={t('drinkMenu.item.name')}
                    onInputChange={handleDrinkNameTextChange}
                  />
                </div>
                {drinkDescription?.position === 'inline' &&
                  <div className='flex flex-col grow'>
                    <LocalizedTextInput
                      id={`${id}-description`}
                      bold={drinkDescription.bold}
                      showLabel={false}
                      className={drinkDescription?.small ? 'text-sm' : 'text-base'}
                      localizedText={drinkDescription.text}
                      legend={t('drinkMenu.item.description')}
                      onInputChange={handleDrinkDescriptionTextChange}
                    />
                  </div>
                }
              </div>

              {/* Drink price */}
              <div className='font-extrabold inline-flex min-w-15 justify-end mt-7'>
                <input
                  id={`${id}-price`}
                  className='pl-3 h-8 w-18 border border-gray-300 rounded-xl'
                  type='number'
                  value={itemPrice}
                  onChange={handlePriceChange}
                />
                <span className='pl-3'>euros</span>
              </div>
            </div>

            {/* Drink description (if not inline) */}
            {drinkDescription?.text && drinkDescription?.position !== 'inline' &&
              <div className={drinkDescription?.position === 'top' ? 'order-1' : 'order-2'}>
                <LocalizedTextInput
                  id={`${id}-description`}
                  bold={drinkDescription.bold}
                  className={drinkDescription?.small ? 'text-sm' : 'text-base'}
                  localizedText={drinkDescription.text}
                  legend={t('drinkMenu.item.description')}
                  onInputChange={handleDrinkDescriptionTextChange}
                />
              </div>
            }

            <div className='order-3 flex flex-col sm:flex-row gap-1.5 justify-between'>
              <fieldset className='text-base font-semibold'>
                <legend className='py-2'>{t('drinkMenu.item.nameStyle.legend')}</legend>
                <SwitchButton
                  label={t('editorBox.bold')}
                  id={`${id}-radiogroup-name-bold`}
                  onCheckedChange={handleDrinkNameBoldChange}
                  defaultChecked={drinkName?.bold}
                />
              </fieldset>

              {drinkDescription &&
                <>
                  <fieldset className='text-base font-semibold'>
                    <legend className='py-2'>{t('drinkMenu.item.descriptionStyle.legend')}</legend>
                    <SwitchButton
                      label={t('editorBox.bold')}
                      onCheckedChange={handleDrinkDescriptionBoldChange}
                      defaultChecked={drinkDescription?.bold}
                    />
                    <SwitchButton
                      label={t('editorBox.small')}
                      onCheckedChange={handleDrinkDescriptionSmallChange}
                      defaultChecked={drinkDescription?.small}
                    />
                  </fieldset>

                  <fieldset className='text-base font-semibold'>
                    <legend className='py-2'>
                      {t('drinkMenu.item.descriptionPosition.legend')}
                    </legend>
                    <RadioGroup.Root
                      id={`${id}-radiogroup-description`}
                      className='flex flex-col sm:flex-row gap-2'
                      value={drinkDescription?.position ?? 'bottom'}
                      onValueChange={handleDescriptionPositionChange}
                      aria-label={t('drinkMenu.item.descriptionPosition.legend')}
                    >
                      <RadioOption value='top' label={t('editorBox.top')} />
                      <RadioOption value='inline' label={t('editorBox.inline')} />
                      <RadioOption value='bottom' label={t('editorBox.bottom')} />
                    </RadioGroup.Root>
                  </fieldset>
                </>
              }
            </div>

          </div>
          {!drinkDescription?.text &&
            <div className='flex items-center gap-2 text-sm text-gray-500 italic'>
              <button
                className='text-teal-600 hover:underline hover:cursor-pointer'
                onClick={addDescription}
              >
                {t('drinkMenu.item.addDescription')}
              </button>
            </div>
          }
        </>
      }
    />
  );
};

export default DrinkItem;