'use client';

import { AllergenIcon, Chevron, Cross } from '@/components/_icons';
import { AllergenType } from '@/types/Allergen';
import { Combobox, createListCollection } from '@ark-ui/react/combobox';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

type AllergenSelectorProps = {
  value?: AllergenType[];
  onChange?: (value: AllergenType[]) => void;
  isAllergenTraces?: boolean;
};

const allergenTypes: AllergenType[] = [
  'celery',
  'crustaceans',
  'eggs',
  'fish',
  'gluten',
  'lupin',
  'milk',
  'molluscs',
  'mustard',
  'nuts',
  'peanuts',
  'sesameSeeds',
  'soybeans',
  'sulphites',
];

const isAllergenType = (value: string): value is AllergenType => (
  allergenTypes.includes(value as AllergenType)
);

const AllergenSelector: FC<AllergenSelectorProps> = ({ value = [], onChange, isAllergenTraces }) => {
  const t = useTranslations('pages.menu.allergens');
  const [inputValue, setInputValue] = useState('');
  const collection = createListCollection({
    items: allergenTypes.map((type) => ({
      value: type,
      label: t(`list.${type}`),
    })),
  });

  const filteredCollection = collection.filter((_, _index, item) => {
    const query = inputValue.trim().toLocaleLowerCase();
    return !query
      || item.label.toLocaleLowerCase().includes(query)
      || item.value.toLocaleLowerCase().includes(query);
  });

  const handleValueChange = (nextValue: string[]) => {
    onChange?.(nextValue.filter(isAllergenType));
  };

  return (
    <div className='flex flex-col gap-3 w-full my-6'>
      <Combobox.Root
        collection={collection}
        multiple
        value={value}
        inputValue={inputValue}
        onInputValueChange={({ inputValue: nextInputValue }) => setInputValue(nextInputValue)}
        onValueChange={({ value: nextValue }) => handleValueChange(nextValue)}
        selectionBehavior='clear'
        allowCustomValue={false}
        openOnClick
      >
        <Combobox.Label className='text-lg font-bold text-bossanova-cyan'>
          {isAllergenTraces ? t('allergenTraces') : t('allergens')}
        </Combobox.Label>
        <Combobox.Control className='flex min-h-11 w-full items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-bossanova-cyan'>
          <div className='flex min-w-0 flex-1 flex-wrap items-center gap-2'>
            {value.map((type) => (
              <span
                key={type}
                className='inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-bossanova-cyan'
              >
                <AllergenIcon type={type} size={20} aria-hidden={true} />
                <span>{t(`list.${type}`)}</span>
                <button
                  type='button'
                  aria-label={`${t('deleteAllergen')} ${t(`list.${type}`)}`}
                  className='p-0.5 hover:text-bossanova-red cursor-pointer rounded-full'
                  onClick={(event) => {
                    event.stopPropagation();
                    handleValueChange(value.filter((selected) => selected !== type));
                  }}
                >
                  <Cross className='w-3 h-3' />
                </button>
              </span>
            ))}
            <Combobox.Input
              placeholder={value.length === 0 ? (isAllergenTraces ? t('allergenTraces') : t('allergens')) : undefined}
              className='min-w-24 flex-1 border-0 bg-transparent p-0 text-bossanova-cyan outline-none placeholder:text-gray-400'
            />
          </div>
          <Combobox.Trigger className='shrink-0' aria-label={isAllergenTraces ? t('allergenTraces') : t('allergens')}>
              <Chevron className='w-5 h-5' />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content className='z-10 w-(--reference-width) max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg'>
            <Combobox.List>
              {filteredCollection.items.map((item) => (
              <Combobox.Item
                key={item.value}
                item={item}
                className={[
                  'flex',
                  'items-center',
                  'gap-2',
                  'px-3',
                  'py-2',
                  'cursor-pointer',
                  'border-white',
                  'border-solid',
                  'border-2',
                  'rounded-md',
                  'text-bossanova-cyan',
                  'data-highlighted:bg-gray-100',
                  'data-[state=checked]:bg-slate-100',
                  'data-[state=checked]:hover:bg-slate-200',
                ].join(' ')}
              >
                <AllergenIcon type={item.value} size={20} aria-hidden={true} />
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator className='ml-auto'>
                  &#10003;
                </Combobox.ItemIndicator>
              </Combobox.Item>
              ))}
            </Combobox.List>
            <Combobox.Empty className='px-3 py-2 text-sm text-gray-500'>
              {t('noMatchingAllergens')}
            </Combobox.Empty>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </div>
  );
};

export default AllergenSelector;