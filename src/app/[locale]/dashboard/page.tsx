import { Calendar, ForkKnife, Megaphone } from '@/components/_icons';
import { type FC, JSX } from 'react';
import { Link } from '@/i18n/navigation';

type DashboardItem = {
  name: string;
  href: string;
  icon?: JSX.Element;
};

const Dashboard: FC = () => {
  const dashboardItems: DashboardItem[] = [
    {
      name: 'Menu Edition',
      href: 'dashboard/menu-edition',
      icon: <ForkKnife width={60} height={60} />,
    },
    {
      name: 'Opening Hours',
      href: 'dashboard/opening-hours',
      icon: <Calendar width={60} height={60} />,
    },
    {
      name: 'Communication',
      href: 'dashboard/communication',
      icon: <Megaphone width={60} height={60} />,
    },
  ];
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
      <p>Welcome to your dashboard! This is a protected page.</p>
      <ul className='flex flex-col md:flex-row gap-6 mt-6'>
        {dashboardItems.map((item) => (
          <li
            key={item.href}
            className='p-4 rounded-lg hover:bg-gray-100 transition-colors'
          >
            <Link
              href={item.href}
              className='text-bossanova-cyan hover:underline flex flex-col items-center'
            >
              <div className='flex items-center justify-center p-6'>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;