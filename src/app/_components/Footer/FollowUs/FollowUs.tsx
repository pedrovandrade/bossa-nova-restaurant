import { FC } from 'react';
import { FacebookIcon, InstagramIcon } from './_icons';
import { useTranslations } from 'next-intl';

const FollowUs: FC = () => {
  const items = [
    {
      name: 'facebook',
      href: 'https://www.facebook.com/p/Bossa-Nova-61575625690678/',
      icon: <FacebookIcon />,
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/bossanovatoulouse/',
      icon: <InstagramIcon />,
    },
  ];

  const t = useTranslations('footer.followUs');

  return (
    <div className='flex space-x-4'>
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(`ariaLabel.${item.name}`)}
          className='hover:text-gray-300'
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default FollowUs;