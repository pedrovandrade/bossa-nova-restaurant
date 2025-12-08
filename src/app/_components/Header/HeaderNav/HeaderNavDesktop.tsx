'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { FC } from 'react';
import { HeaderLanguageListProps } from '@/components/Header';
import { HeaderLanguageSelector } from '@/components/Header/HeaderLanguageSelector';
import { getPointColorClass } from './HeaderNav';

const HeaderNavDesktop: FC<HeaderLanguageListProps> = ({ languageOptions, siteLinks }) => {
  const currentLocale = useLocale();

  const t = useTranslations('header');

  const pathname = usePathname();

  return (
    <nav className='hidden md:flex md:items-center md:justify-around md:w-full'>
      <ul className="flex space-x-4">
        {siteLinks?.map((item) => {
          const { pointColor } = item;
          const pointColorClass = getPointColorClass(pointColor || '');
          const pointGrowthClass = pathname === item.href ? 'before:w-full' : 'hover:before:w-full';
          const fontWeightClass = pathname === item.href ? 'font-semibold' : 'font-medium';

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={[
                  'relative',
                  'before:content-[" "]',
                  'before:block',
                  'before:relative',
                  'before:mx-auto',
                  'before:-bottom-full',
                  'before:w-1',
                  'before:h-1',
                  'before:rounded-full',
                  'before:transition-all',
                  'before:duration-300',
                  pointGrowthClass,
                  pointColorClass,
                  fontWeightClass,
                ].join(' ')}
                locale={currentLocale}
              >
                {t(`nav.${item.name}`)}
              </Link>
            </li>
          );
        })}
      </ul>
      <HeaderLanguageSelector
        languageOptions={languageOptions}
        currentLocale={currentLocale}
      />
    </nav>
  );
}

export default HeaderNavDesktop;