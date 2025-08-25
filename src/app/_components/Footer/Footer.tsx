import { FC } from 'react';
import AddressAndContact from './AddressAndContact';
import SiteMap from './SiteMap';
import MapLocation from './MapLocation';
import FooterItem from './FooterItem';
import FollowUs from './FollowUs';

const Footer: FC = () => {
    return (
        <footer className='flex flex-col bg-bossanova-cyan text-white px-4 pt-8 pb-6 space-y-4'>
          <div className='w-full flex items-start flex-col lg:flex-row p-4'>
            <div className='w-full flex-wrap lg:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-8 items-start'>
              <FooterItem title="Address & Contact" id="contact">
                <AddressAndContact />
              </FooterItem>
              <FooterItem title="Site Map" id="site-map">
                <SiteMap />
              </FooterItem>
              <FooterItem title="Follow Us" id="follow-us">
                <FollowUs />
              </FooterItem>
            </div>
            <div className='w-full lg:w-1/2 flex items-start py-8 md:py-0' id='location'>
              <MapLocation />
            </div>
          </div>
          <div className='w-full flex justify-center items-center'>
            <p className='text-sm'>
                &copy; {new Date().getFullYear()} Bossa Nova Restaurant. All rights reserved.
            </p>
          </div>
        </footer>
    );
}

export default Footer;