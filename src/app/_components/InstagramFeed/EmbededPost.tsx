import { FC, useEffect, useRef } from 'react';

type EmbededPostProps = {
  url?: string;
  onLoad?: () => void;
};

type ExtendedWindow = Window & {
  instgrm?: {
    Embeds: {
      process: () => void;
    };
  };
};

const EmbededPost: FC<EmbededPostProps> = ({ url, onLoad }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const processEmbed = () => {
      if ((window as ExtendedWindow).instgrm) {
        (window as ExtendedWindow).instgrm?.Embeds.process();
      }
    };

    // Load Instagram script once
    if (!(window as ExtendedWindow).instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = processEmbed;
      document.body.appendChild(script);
    } else {
      processEmbed();
    }

    // Observe DOM changes inside container
    const observer = new MutationObserver(() => {
      if (!containerRef.current) return;

      // Instagram injects an iframe inside
      const iframe = containerRef.current.querySelector('iframe');
      if (iframe) {
        onLoad?.(); // signal 'loaded'
        observer.disconnect();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [url, onLoad]);

  return (
    <div key={url} className='w-full flex justify-center items-center' ref={containerRef}>
      <blockquote
        className='instagram-media'
        data-instgrm-permalink={url}
        data-instgrm-captioned
        data-instgrm-version='14'
        style={{ maxWidth: 540, width: '100%' }}
      />
    </div>
  );
};

export default EmbededPost;