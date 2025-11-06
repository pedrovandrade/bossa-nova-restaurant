'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FC } from 'react';
import { HeaderLanguageListProps } from '@/components/Header';
import { HeaderLanguageSelector } from '@/components/Header/HeaderLanguageSelector';
import { usePathname } from 'next/navigation';

const HeaderNavDesktop: FC<HeaderLanguageListProps> = ({ languageOptions, siteLinks }) => {
  const currentLocale = useLocale();

  const t = useTranslations('header');

  const pathname = usePathname();

  return (
    <nav className='hidden md:flex md:items-center md:justify-around md:w-full'>
      <ul className="flex space-x-4">
        {siteLinks?.map((item) => {
          const { pointColor } = item;
          let pointColorClass = '';

          switch (pointColor) {
            case 'orange':
              pointColorClass = 'before:bg-bossanova-orange';
              break;
            case 'cyan':
              pointColorClass = 'before:bg-bossanova-cyan';
              break;
            case 'yellow':
              pointColorClass = 'before:bg-bossanova-yellow';
              break;
            case 'green':
              pointColorClass = 'before:bg-bossanova-green';
              break;
            case 'blue':
              pointColorClass = 'before:bg-bossanova-blue';
              break;
            case 'pink':
              pointColorClass = 'before:bg-bossanova-pink';
              break;
            case 'red':
              pointColorClass = 'before:bg-bossanova-red';
              break;
            case 'white':
              pointColorClass = 'before:bg-white';
              break;
            default:
              break;
          }

          const itemRoute = item.href === '/' ? `/${currentLocale}` : `/${currentLocale}${item.href}`;
          const pointGrowthClass = pathname === itemRoute ? 'before:w-full' : 'hover:before:w-full';

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
                  'hover:bg-bossanova-blue/50',
                  pointGrowthClass,
                  pointColorClass,
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