'use client';

import { type FC, useEffect, useState } from 'react';
import EmbededPost from './EmbededPost';
import PostPlaceholder from './PostPlaceholder';
import { type CookiePreferences } from '@/components/CookieConsent/CookieConsent';

export type InstagramFeedProps = {
  url?: string;
};

const COOKIE_NAME = 'bossa_cookie_consent';

/** Read and parse consent cookie (returns parsed object or null) */
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

/**
 * InstagramFeed:
 * - shows EmbededPost only when consent for external embeds (analytics/marketing) is true
 * - otherwise shows PostPlaceholder
 * - while the iframe loads we show the PostPlaceholder (managed via onLoad callback)
 */
const InstagramFeed: FC<InstagramFeedProps> = ({ url }) => {
  const [hasEmbedConsent, setHasEmbedConsent] = useState<boolean | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const updateConsentState = () => {
    const consent = readConsentCookie();
    // treat external embeds as allowed when external cookie consent is true in the stored object
    const allowed = !!consent && (Boolean((consent as CookiePreferences).external));
    setHasEmbedConsent(allowed);
  };

  useEffect(() => {
    // initial read
    updateConsentState();

    // listen for updates performed by the CookieConsent component
    const onConsentUpdated = () => {
      updateConsentState();
    };
    window.addEventListener('cookieConsentUpdated', onConsentUpdated as EventListener);

    return () => {
      window.removeEventListener('cookieConsentUpdated', onConsentUpdated as EventListener);
    };
  }, []);

  // While we don't know consent yet you can return null or a placeholder.
  if (hasEmbedConsent === null) return null;

  if (!hasEmbedConsent) {
    return <PostPlaceholder url={url} hasConsent={hasEmbedConsent} />;
  }

  // consent granted -> show embed + placeholder until iframe fires onLoad
  return (
    <>
      {!iframeLoaded && <PostPlaceholder url={url} hasConsent={hasEmbedConsent} />}
      <EmbededPost
        url={url}
        isLoaded={iframeLoaded}
        onLoad={() => setIframeLoaded(true)}
      />
    </>
  );
};

export default InstagramFeed;