import { FC } from 'react';
import AddressAndContact from './AddressAndContact';
import SiteMap from './SiteMap';
import MapLocation from './MapLocation';
import FooterItem from './FooterItem';
import FollowUs from './FollowUs';
import { useTranslations } from 'next-intl';

const Footer: FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className='flex flex-col bg-bossanova-cyan text-white px-4 pt-8 pb-6 space-y-4'>
      <div className='w-full flex items-start flex-col lg:flex-row p-4'>
        <div className='w-full flex-wrap lg:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-8 items-start'>
          <FooterItem title={t('contact.title')} id="footer-contact">
            <AddressAndContact />
          </FooterItem>
          <FooterItem title={t('siteMap.title')} id="footer-site-map">
            <SiteMap />
          </FooterItem>
          <FooterItem title={t('followUs.title')} id="footer-follow-us">
            <FollowUs />
          </FooterItem>
        </div>
        <div className='w-full lg:w-1/2 flex items-start py-8 md:py-0' id='footer-maps-location'>
          <MapLocation query='Bossa Nova Restaurant Toulouse' />
        </div>
      </div>
      <div className='w-full flex justify-center items-center'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} {t('allRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;