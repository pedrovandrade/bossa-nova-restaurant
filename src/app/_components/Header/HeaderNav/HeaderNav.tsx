import { FC } from 'react';
import { HeaderLanguageListProps } from '@/components/Header';
import HeaderNavDesktop from './HeaderNavDesktop';
import HeaderNavMobile from './HeaderNavMobile';

export const getPointColorClass = (pointColor: string) => {
  let pointColorClass = '';

  switch (pointColor) {
    case 'orange':
      pointColorClass = 'before:bg-bossanova-orange';
      break;
    case 'cyan':
      pointColorClass = 'before:bg-bossanova-cyan';
      break;
    case 'yellow':
      pointColorClass = 'before:bg-bossanova-yellow';
      break;
    case 'green':
      pointColorClass = 'before:bg-bossanova-green';
      break;
    case 'blue':
      pointColorClass = 'before:bg-bossanova-blue';
      break;
    case 'pink':
      pointColorClass = 'before:bg-bossanova-pink';
      break;
    case 'red':
      pointColorClass = 'before:bg-bossanova-red';
      break;
    case 'white':
      pointColorClass = 'before:bg-white';
      break;
    default:
      break;
  }

  return pointColorClass;
}

const HeaderNav: FC<HeaderLanguageListProps> = ({ languageOptions, siteLinks }) => {
  return (
    <>
      <HeaderNavDesktop languageOptions={languageOptions} siteLinks={siteLinks} />
      <HeaderNavMobile languageOptions={languageOptions} siteLinks={siteLinks} />
    </>
  );
}

export default HeaderNav;