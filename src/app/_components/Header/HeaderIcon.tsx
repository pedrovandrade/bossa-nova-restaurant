import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { FC } from 'react';
import logoGuitar from '@/assets/images/logo-guitar.png';

const HeaderIcon: FC = () => {
  return (
    <div>
      <Link href={'/'}>
        <Image
          src={logoGuitar}
          alt='Go to home page'
          height={40}
          width={80}
          className='w-20 min-w-20'
        />
      </Link>
    </div>
  );
}

export default HeaderIcon;