import { Link } from '@/i18n/navigation';
import { FC } from 'react';
import { BossaNovaLogoHorizontal } from '@/components/_icons';
import { useTranslations } from 'next-intl';

const HeaderIcon: FC = () => {
  const t = useTranslations();
  return (
    <Link href={'/'} aria-label={t('header.logoAriaLabel')}>
      <BossaNovaLogoHorizontal />
    </Link>
  );
}

export default HeaderIcon;