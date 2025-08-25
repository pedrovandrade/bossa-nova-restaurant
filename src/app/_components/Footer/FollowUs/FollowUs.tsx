import { FC } from 'react';
import { FacebookIcon, InstagramIcon } from './_icons';

const FollowUs: FC = () => {
  const items = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/p/Bossa-Nova-61575625690678/',
      icon: <FacebookIcon />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/bossanovatoulouse/',
      icon: <InstagramIcon />,
    },
  ];

  return (
    <div className='flex space-x-4'>
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className='hover:text-gray-300'
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default FollowUs;