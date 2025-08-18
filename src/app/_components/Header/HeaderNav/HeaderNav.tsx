import { FC } from 'react';
import { HeaderLanguageListProps } from '@components/Header';
import HeaderNavDesktop from './HeaderNavDesktop';
import HeaderNavMobile from './HeaderNavMobile';

const HeaderNav: FC<HeaderLanguageListProps> = ({ languageOptions, siteLinks }) => {

  return (
    <>
      <HeaderNavDesktop languageOptions={languageOptions} siteLinks={siteLinks} />
      <HeaderNavMobile languageOptions={languageOptions} siteLinks={siteLinks} />
    </>
  );
}

export default HeaderNav;