'use client';

import { type FC, useEffect, useState } from 'react';
import CookieConsentBanner from './CookieConsentBanner';
import CookieConsentModal from './CookieConsentModal';

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  external: boolean;
};

const COOKIE_NAME = 'bossa_cookie_consent';
const COOKIE_EXPIRE_DAYS = 365;

const readConsent = (): CookiePreferences | null => {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split('=')[1])) as CookiePreferences;
  } catch {
    return null;
  }
};

const writeConsent = (preferences: CookiePreferences) => {
  if (typeof document === 'undefined') return;
  const v = encodeURIComponent(JSON.stringify(preferences));
  const d = new Date();
  d.setDate(d.getDate() + COOKIE_EXPIRE_DAYS);
  document.cookie = `${COOKIE_NAME}=${v}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;

  // notify other parts of the app that consent changed
  window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: preferences }));
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  external: false,
};

const CookieConsent: FC = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(defaultPreferences);
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(defaultPreferences);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    setPreferences(existing);
    if (existing) setLocalPrefs(existing);

    const onOpen = () => setIsModalOpen(true);
    window.addEventListener('openCookiePreferences', onOpen);
    return () => window.removeEventListener('openCookiePreferences', onOpen);
  }, []);

  const acceptAll = () => {
    const p: CookiePreferences = { necessary: true, analytics: true, external: true };
    writeConsent(p);
    setPreferences(p);
    setIsModalOpen(false);
  };

  const refuseAll = () => {
    const p: CookiePreferences = { necessary: true, analytics: false, external: false };
    writeConsent(p);
    setPreferences(p);
    setIsModalOpen(false);
  };

  const openPreferences = () => {
    setLocalPrefs((prev) => (preferences ? preferences : prev));
    setIsModalOpen(true);
  };

  const confirmPreferences = () => {
    writeConsent(localPrefs);
    setPreferences(localPrefs);
    setIsModalOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  const setCookiePreference = (name: string, value: boolean) => {
    setLocalPrefs((p) => ({ ...p, [name]: value }))
  };

  return (
    <>
      {/* Banner */}
      {!preferences && <CookieConsentBanner
        onAcceptAll={acceptAll}
        onRefuseAll={refuseAll}
        onOpenPreferences={openPreferences}
      />}

      {/* Modal / Popin */}
      {isModalOpen && (
        <CookieConsentModal
          closeModal={closeModal}
          localPreferences={localPrefs}
          setCookiePreference={setCookiePreference}
          onConfirmPreferences={confirmPreferences}
        />
      )}
    </>
  );
};

export default CookieConsent;