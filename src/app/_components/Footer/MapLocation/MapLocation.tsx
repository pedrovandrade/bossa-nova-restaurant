'use client';

import { type FC, useEffect, useState } from 'react';
import MapPlaceholder from './MapPlaceholder';
import { type CookiePreferences } from '@/components/CookieConsent/CookieConsent';

interface MapLocationProps {
  /** The search query string to locate the restaurant on Google Maps. */
  query: string;
}

const COOKIE_NAME = 'bossa_cookie_consent';

const readConsentCookie = (): Record<string, unknown> | null => {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split('=')[1]));
  } catch {
    return null;
  }
};

const MapLocation: FC<MapLocationProps> = ({ query }) => {
  const [hasEmbedConsent, setHasEmbedConsent] = useState<boolean | null>(null);

  const updateConsentState = () => {
    const consent = readConsentCookie();
    const allowed = !!consent && Boolean((consent as CookiePreferences).external);
    setHasEmbedConsent(allowed);
  };

  useEffect(() => {
    updateConsentState();

    const onConsentUpdated = () => {
      updateConsentState();
    };
    window.addEventListener('cookieConsentUpdated', onConsentUpdated as EventListener);

    return () => {
      window.removeEventListener('cookieConsentUpdated', onConsentUpdated as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCookiePreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openCookiePreferences'));
    }
  };

  // while we don't know consent yet, don't render iframe to avoid SSR mismatch
  if (!hasEmbedConsent) {
    return <MapPlaceholder onOpenPreferences={openCookiePreferences} />;
  }

  return (
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`}
      width='600'
      height='400'
      style={{ border: 0 }}
      allowFullScreen={false}
      loading='lazy'
      className='rounded-md w-full h-64 md:h-80 lg:h-96'
    />
  );
};

export default MapLocation;