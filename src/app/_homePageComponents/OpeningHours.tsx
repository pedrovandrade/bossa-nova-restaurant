import { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import { OpeningHoursData } from '@/types/OpeningHoursData';
import FadeInContainer from '../_components/FadeInContainer';

const OpeningHours: FC = async () => {
  let openingHoursData: OpeningHoursData | null = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openingHours`, {
      cache: 'no-store',
    });
    if (response.ok) {
      openingHoursData = (await response.json()) as OpeningHoursData;
    }
  } catch {
    openingHoursData = null;
  }

  const t = await getTranslations('openingHours');

  return (
    <div className='px-5 md:px-10 flex flex-col items-center rounded-md w-full md:max-w-md mx-auto'>
      <h2 className='font-semibold text-3xl text-bossanova-cyan mb-6'>
        {t('title')}
      </h2>

      {!openingHoursData && (
        <div className='text-center text-xl text-gray-600'>{t('unavailable')}</div>
      )}

      {openingHoursData && (
        <ul className='w-full'>
          {Object.entries(openingHoursData).map(([weekday, info], index) => {
            const { isOpen, timespans } = info;
            const hasHours = Array.isArray(timespans) && timespans.length;

            return (
              <FadeInContainer key={weekday} direction={index % 2 === 0 ? 'left' : 'right' }>
                <li className='flex justify-between items-start text-slate-700 border-b-1 border-b-gray-200 py-4'>
                  <span className='font-semibold'>{t(`weekdays.${weekday}`)}</span>
                  <span className='text-right'>
                    {!isOpen &&
                      <span className='text-gray-600'>
                        {t('closed')}
                      </span>
                    }
                    {isOpen && !hasHours ? (
                      <span className='text-gray-700'>
                        {t('unavailable')}
                      </span>
                    ) : null}
                    {isOpen && hasHours ? (
                      <div className='flex flex-col items-end'>
                        {timespans.map((t, i) => (
                          <span key={i}>
                            {t.begin} - {t.end}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </span>
                </li>
              </FadeInContainer>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OpeningHours;
