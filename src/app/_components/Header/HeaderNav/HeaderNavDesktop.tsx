import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FC } from 'react';
import { HeaderLanguageListProps } from '@components/Header';
import { HeaderLanguageSelector } from '@components/Header/HeaderLanguageSelector';

const HeaderNavDesktop: FC<HeaderLanguageListProps> = ({ languageOptions, siteLinks }) => {
  const currentLocale = useLocale();

  const t = useTranslations('header');

  return (
    <nav className='hidden md:flex md:items-center md:justify-around md:w-full'>
      <ul className="flex space-x-4">
        {siteLinks?.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="hover:underline">
              {t(`nav.${item.name}`)}
            </Link>
          </li>
        ))}
      </ul>
      <HeaderLanguageSelector
        languageOptions={languageOptions}
        currentLocale={currentLocale}
      />
    </nav>
  );
}

export default HeaderNavDesktop;