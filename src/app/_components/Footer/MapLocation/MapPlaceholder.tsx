import { type FC } from 'react';
import Image from 'next/image';
import mapsPlaceholder from '@/assets/images/maps_placeholder.png';
import { useTranslations } from 'next-intl';

type MapPlaceholderProps = {
  onOpenPreferences: () => void;
};

const MapPlaceholder: FC<MapPlaceholderProps> = ({ onOpenPreferences }) => {
  const t = useTranslations('footer.maps.placeholder');

  return (
    <button
      tabIndex={0}
      onClick={onOpenPreferences}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenPreferences();
      }}
      className='relative w-full h-64 md:h-80 lg:h-96 text-lg font-bold rounded-md flex items-center justify-center cursor-pointer'
    >
      <Image
        src={mapsPlaceholder}
        alt={t('altText')}
        fill
        objectFit='cover'
        className='absolute w-full h-full rounded-md'
      />
      <div className='px-15 z-50 rounded-md w-full h-full flex items-center justify-center bg-gray-800/50 hover:bg-gray-800/60 transition-colors'>
        <p className='mb-1 text-white'>{t('mustAcceptCookies')}</p>
      </div>
    </button>
  );
};

export default MapPlaceholder;