import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FC } from 'react';

const HeaderTitle: FC = () => {
  const t = useTranslations('header');

  return (
    <h1 className='text-xl font-semibold py-5 px-4 font-(family-name:--font-feeling-passionate)'>
      <Link href='/' className='hover:underline'>
        {t('title')}
      </Link>
    </h1>
  );
};

export default HeaderTitle;