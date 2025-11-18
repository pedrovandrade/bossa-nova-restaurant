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

const writeConsent = (prefs: CookiePreferences) => {
  if (typeof document === 'undefined') return;
  const v = encodeURIComponent(JSON.stringify(prefs));
  const d = new Date();
  d.setDate(d.getDate() + COOKIE_EXPIRE_DAYS);
  document.cookie = `${COOKIE_NAME}=${v}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
};

const defaultPreferences = (): CookiePreferences => ({
  necessary: true,
  analytics: false,
  external: false,
});

const CookieConsent: FC = () => {
  const [prefs, setPrefs] = useState<CookiePreferences | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(defaultPreferences());

  useEffect(() => {
    const existing = readConsent();
    setPrefs(existing);
    if (existing) setLocalPrefs(existing);
  }, []);

  const acceptAll = () => {
    const p: CookiePreferences = { necessary: true, analytics: true, external: true };
    writeConsent(p);
    setPrefs(p);
    setOpenModal(false);
  };

  const refuseAll = () => {
    const p: CookiePreferences = { necessary: true, analytics: false, external: false };
    writeConsent(p);
    setPrefs(p);
    setOpenModal(false);
  };

  const openPreferences = () => {
    setLocalPrefs((prev) => (prefs ? prefs : prev));
    setOpenModal(true);
  };

  const confirmPreferences = () => {
    // quick shortcut: toggle all on if none selected
    if (!localPrefs.analytics && !localPrefs.external) {
      setLocalPrefs({ necessary: true, analytics: true, external: true });
      writeConsent({ necessary: true, analytics: true, external: true });
      setPrefs({ necessary: true, analytics: true, external: true });
      setOpenModal(false);
      return;
    }
    writeConsent(localPrefs);
    setPrefs(localPrefs);
    setOpenModal(false);
  };

  const closeModal = () => setOpenModal(false);

  const setCookiePreference = (name: string, value: boolean) => {
    setLocalPrefs((p) => ({ ...p, [name]: value }))
  };

  return (
    <>
      {/* Banner */}
      {!prefs && <CookieConsentBanner
        onAcceptAll={acceptAll}
        onRefuseAll={refuseAll}
        onOpenPreferences={openPreferences}
      />}

      {/* Modal / Popin */}
      {openModal && (
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