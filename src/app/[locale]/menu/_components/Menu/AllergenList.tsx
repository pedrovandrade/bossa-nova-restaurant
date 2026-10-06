import { AllergenType } from '@/types/Allergen';
import {
  AllergenIcon,
} from '@/components/_icons';
import { useTranslations } from 'next-intl';

const allergenList: AllergenType[] = [
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
  'sulphites'
];

const AllergenList = () => {
  const t = useTranslations('pages.menu.allergens');
  return (
    <section className='flex flex-col items-center justify-center w-full my-10 pl-7 md:pl-20 pr-7 md:pr-30 py-7 text-bossanova-cyan'>
      <h2 className='text-2xl font-bold text-bossanova-cyan mb-8'>{t('allergenList')}</h2>
      <ul className='flex flex-wrap gap-8 max-w-xl mx-auto justify-center'>
        {allergenList.map((allergen) => (
          <li key={allergen} className='flex items-center gap-2'>
            <span className='flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full'>
              <AllergenIcon type={allergen} size={30} aria-hidden={true} />
            </span>
            <span className='text-lg'>{t(`list.${allergen}`)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AllergenList;