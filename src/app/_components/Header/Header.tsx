'use client';

import { FC, JSX } from 'react';
import HeaderNav from './HeaderNav';
import HeaderTitle from './HeaderTitle';
import HeaderIcon from './HeaderIcon';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FranceFlag, BrazilFlag, GreatBritainFlag } from '@/components/_icons';

export type LanguageOption = {
    locale: string;
    url: string;
    label: string;
    icon: JSX.Element;
};

export type HeaderLanguageListProps = {
  languageOptions: LanguageOption[];
  siteLinks?: {
    href: string;
    name: string;
  }[];
}

const Header: FC = () => {
  /**
 * Generates a URL with the new locale.
 * @param currentLocale The current locale of the application
 * @param newLocale The new locale to switch to
 * @param pathname The current pathname of the application
 * @returns The URL with the new locale
 */
const getLocaleUrl = (currentLocale: string, newLocale: string, pathname: string): string => {
  const url: string = pathname.replace(currentLocale, newLocale);
  return url;
};

// Get the current pathname and locale
const pathname = usePathname();
const currentLocale = useLocale();

const languageOptions: LanguageOption[] = [
  { locale: 'fr', url: getLocaleUrl(currentLocale, 'fr', pathname), label: 'Français', icon: <FranceFlag /> },
  { locale: 'pt', url: getLocaleUrl(currentLocale, 'pt', pathname), label: 'Português', icon: <BrazilFlag /> },
  { locale: 'en', url: getLocaleUrl(currentLocale, 'en', pathname), label: 'English', icon: <GreatBritainFlag /> },
];

const siteLinks = [
  { href: '/', name: 'home' },
  { href: '/menu', name: 'menu' },
  { href: '/reservations', name: 'reservations' },
  { href: '/about', name: 'about' },
];

return (
  <header className='fixed w-full h-20 flex bg-bossanova-cyan justify-between text-white z-50 shadow-md shadow-black/25'>
    <div className='w-5/7 md:w-1/2 flex items-center justify-between md:justify-around'>
      <HeaderTitle />
      <HeaderIcon />
    </div>
    <div className='w-2/7 md:w-1/2 flex items-center justify-end mx-3'>
      <HeaderNav languageOptions={languageOptions} siteLinks={siteLinks} />
    </div>
  </header>
);
}

export default Header;