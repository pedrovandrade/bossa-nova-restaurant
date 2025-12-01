'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const siteLinks = [
  { href: '/', name: 'home' },
  { href: '/menu', name: 'menu' },
  { href: '/reservations', name: 'reservations' },
  { href: '/about', name: 'about' },
  { href: '/privacy-policy', name: 'privacy-policy' },
];

const SiteMap: FC = () => {
  const t = useTranslations('footer.siteMap');

  const openCookiePreferences = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  };

  return (
    <nav>
      <ul className='space-y-2'>
        {siteLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className='hover:underline'>
              {t(link.name)}
            </Link>
          </li>
        ))}

        {/* Cookie preferences button (not a navigation link) */}
        <li>
          <button
            type='button'
            onClick={openCookiePreferences}
            className='hover:underline text-left p-0 m-0'
          >
            {t('cookieSettings')}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SiteMap;