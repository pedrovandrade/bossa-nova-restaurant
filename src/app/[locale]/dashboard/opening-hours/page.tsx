import { type FC } from 'react';
import { OpeningHoursData } from '@/types/OpeningHoursData';
import OpeningHoursEditionForm from './_components/OpeningHoursEditionForm';
import { getTranslations } from 'next-intl/server';

const OpeningHoursPage: FC = async () => {
  const t = await getTranslations('pages.dashboard.pages.openingHours');

  let openingHours: OpeningHoursData | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/openingHours`,
      { cache: 'no-store' }
    );
    if (!response.ok) throw new Error('Failed to load');

    openingHours = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className='text-bossanova-cyan py-8 w-full flex flex-col items-center'>
      <h1 className='text-4xl text-black font-bold mb-4 flex justify-center'>
        {t('title')}
      </h1>
      { openingHours
        ? <OpeningHoursEditionForm openingHoursData={openingHours} />
        : <p>Failed to load opening hours data.</p>
      }
    </section>
  );
};

export default OpeningHoursPage;
