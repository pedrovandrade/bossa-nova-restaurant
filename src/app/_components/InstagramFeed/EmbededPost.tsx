import { useLocale } from 'next-intl';
import { ReactEventHandler, type FC } from 'react';

type EmbededPostProps = {
  url?: string;
  isLoaded?: boolean;
  onLoad?: ReactEventHandler<HTMLIFrameElement>;
}

const EmbededPost: FC<EmbededPostProps> = ({ url, isLoaded, onLoad }) => {
  const currentLocale = useLocale();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bossa-nova-restaurant.vercel.app';
    const queryParams = new URLSearchParams({
      cr: '1',
      v: '14',
      wp: '540',
      rd: baseUrl,
      rp: `/${currentLocale}`,
    });
    const src = `${url}/embed/captioned/?${queryParams.toString()}`;
  
    return (
      <iframe
        className='instagram-media instagram-media-rendered'
        id='instagram-embed-0'
        src={src}
        allowFullScreen={true}
        height={isLoaded ? '745' : '1'}
        data-instgrm-payload-id='instagram-media-payload-0'
        scrolling='no'
        seamless={true}
        style={{
          background: 'white',
          maxWidth: '540px',
          width: '99.375%',
          borderRadius: '3px',
          border: '1px solid rgb(219, 219, 219)',
          boxShadow: 'none',
          display: 'block',
          margin: '0px 0px 12px',
          minWidth: '326px',
          padding: '0px',
        }}
        loading='lazy'
        onLoad={onLoad}
      ></iframe>
    );
  };
  
  export default EmbededPost;