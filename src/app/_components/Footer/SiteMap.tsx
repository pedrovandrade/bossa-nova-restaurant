import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const siteLinks = [
  { href: '/', name: 'home' },
  { href: '/menu', name: 'menu' },
  { href: '/reservations', name: 'reservations' },
  { href: '/about', name: 'about' },
];

const SiteMap = () => {
  const t = useTranslations('footer.siteMap');

  return (
    <nav>
      <ul className='space-y-2'>
        {siteLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:underline">
              {t(link.name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SiteMap;