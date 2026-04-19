import { Calendar, ForkKnife, Megaphone, SignOut } from '@/components/_icons';
import { type FC, JSX } from 'react';
import { Link } from '@/i18n/navigation';
import { signOut } from '@/auth';
import { CurrentLocale } from '@/types/LocalizedText';
import { useLocale, useTranslations } from 'next-intl';

type DashboardItem = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

const Dashboard: FC = () => {
  const t = useTranslations('pages.dashboard');

  const dashboardItems: DashboardItem[] = [
    {
      name: t('items.menu'),
      href: 'dashboard/menu-edition',
      icon: <ForkKnife width={60} height={60} />,
    },
    {
      name: t('items.openingHours'),
      href: 'dashboard/opening-hours',
      icon: <Calendar width={60} height={60} />,
    },
    {
      name: t('items.marketing'),
      href: 'dashboard/marketing',
      icon: <Megaphone width={60} height={60} />,
    },
  ];

  const currentLocale = useLocale() as CurrentLocale;

  return (
    <div className='p-8 w-full'>
      <h1 className='text-3xl text-center font-bold mb-6 uppercase'>
        {t('title')}
      </h1>
      <ul className='flex flex-col md:flex-row justify-center gap-6 mt-6'>
        {dashboardItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={[
                'p-4',
                'rounded-lg',
                'text-bossanova-cyan',
                'hover:underline',
                'hover:bg-gray-100',
                'transition-colors',
                'flex',
                'flex-col',
                'items-center',
              ].join(' ')}
            >
              <span className='flex items-center justify-center p-6'>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
        <li>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: `/${currentLocale}/login` });
            }}>
              <button
                type='submit'
                className={[
                  'w-full',
                  'p-4',
                  'rounded-lg',
                  'text-bossanova-cyan',
                  'hover:underline',
                  'hover:cursor-pointer',
                  'hover:bg-gray-100',
                  'transition-colors',
                  'flex',
                  'flex-col',
                  'items-center'
                ].join(' ')}
              >
                <span className='flex items-center justify-center p-6'>
                  <SignOut width={60} height={60} />
                </span>
                <span>{t('items.logout')}</span>
              </button>
            </form>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;