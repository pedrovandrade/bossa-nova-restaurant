import { FC } from 'react';
import MarketingEditionForm from './_components/MarketingEditionForm';
import { MarketingData } from '@/types/MarketingData';
import { getTranslations } from 'next-intl/server';

const MarketingPage: FC = async () => {
  let marketingData: MarketingData | null = null;
  let errorMessage: string = '';
  const t = await getTranslations('pages.dashboard.pages.marketing');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/marketing`,
      { cache: 'no-store' }
    );
    if (!response.ok) {
      errorMessage = `${t('errorMessage')}. Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    marketingData = await response.json();
  } catch (err) {
    console.error(err);
  }

  return (
    <div className='py-8 w-full'>
      <h1 className='text-4xl font-bold mb-4 flex justify-center'>{t('title')}</h1>
      {
        marketingData
          ? <MarketingEditionForm data={marketingData} />
          : <p>{errorMessage}</p>
      }
    </div>
  );
};

export default MarketingPage;