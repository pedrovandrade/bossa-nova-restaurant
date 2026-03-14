import { OpeningHoursData } from '@/app/_types/OpeningHoursData';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

const OpeningHoursFooter: FC = async () => {
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
    <>
      {openingHoursData && (
        <ul className='w-full flex flex-col gap-3'>
          {Object.entries(openingHoursData).map(([weekday, info]) => {
            const { isOpen, timespans } = info;
            const hasHours = Array.isArray(timespans) && timespans.length;

            return (
              isOpen && (
                <li key={weekday} className='flex gap-10 justify-between items-start'>
                  <div>{t(`weekdays.${weekday}`)}</div>
                  {hasHours
                    ? (
                      <div className='flex flex-col items-end'>
                        {timespans.map((t, i) => (
                          <span key={i}>
                            {t.begin} - {t.end}
                          </span>
                        ))}
                      </div>
                    )
                    : t('unavailable')
                  }
                </li>
              )
            );
          })}
        </ul>
      )}
    </>
  );
};

export default OpeningHoursFooter;