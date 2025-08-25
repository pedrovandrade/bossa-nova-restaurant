import { Link } from '@/i18n/navigation';

const siteLinks = [
  { href: '/', name: 'home' },
  { href: '/menu', name: 'menu' },
  { href: '/reservations', name: 'reservations' },
  { href: '/about', name: 'about' },
];

const SiteMap = () => {
  return (
    <nav>
      <ul className='space-y-2'>
        {siteLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:underline">
              {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SiteMap;