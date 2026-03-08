import { FC } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { CookiePreferences } from './CookieConsent';
import { Cross } from '@/components/_icons';
import { useTranslations } from 'next-intl';

type CookieConsentModalProps = {
  closeModal: () => void;
  localPreferences: CookiePreferences;
  setCookiePreference: (name: string, value: boolean) => void;
  onConfirmPreferences: () => void;
};

const CookieConsentModal: FC<CookieConsentModalProps> = ({
  closeModal,
  localPreferences,
  setCookiePreference,
  onConfirmPreferences,
}) => {
  const t = useTranslations('cookies.modal');

  const cookieDataList = [
    {
      name: 'necessary',
      label: t('cookieList.necessary.title'),
      description: t('cookieList.necessary.description'),
      ariaLabel: t('cookieList.necessary.ariaLabel'),
      disabled: true,
      checked: true,
    },
    {
      name: 'analytics',
      label: t('cookieList.analytics.title'),
      description: t('cookieList.analytics.description'),
      ariaLabel: t('cookieList.analytics.ariaLabel'),
      disabled: false,
      checked: localPreferences.analytics,
    },
    {
      name: 'external',
      label: t('cookieList.external.title'),
      description: t('cookieList.external.description'),
      ariaLabel: t('cookieList.external.ariaLabel'),
      disabled: false,
      checked: localPreferences.external,
    },
  ];

  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-4'
    >
      <div className='absolute inset-0 bg-black/40' onClick={closeModal} />

      <div className='relative w-full max-w-2xl bg-white rounded-lg shadow-xl px-6 md:px-10 py-6 z-10'>
        {/* Close (X) button */}
        <button
          aria-label={t('closeButtonAriaLabel')}
          onClick={closeModal}
          className='absolute top-3 h-8 w-8 text-gray-500 right-3 p-1 rounded hover:bg-gray-100'
        >
          <Cross />
        </button>

        <h2 className='text-2xl text-bossanova-cyan font-semibold mb-4'>{t('title')}</h2>

        <div className='space-y-4'>
          {cookieDataList.map((cookie) => {
            const { name, label, description, ariaLabel, disabled, checked } = cookie;
            const descriptionId = `cookie-description-${name}`;

            return (
              <div key={name} className=''>
                <div className='flex items-center justify-between'>
                  <label className='font-medium'>{label}</label>
                  <Switch.Root
                    className={[
                      'w-11',
                      'h-6',
                      'rounded-full',
                      'relative',
                      checked ? 'bg-bossanova-cyan' : 'bg-gray-400',
                      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                    ].join(' ')}
                    checked={checked}
                    onCheckedChange={(value) => setCookiePreference(name, value)}
                    disabled={disabled}
                    aria-label={ariaLabel}
                    aria-describedby={descriptionId}
                  >
                    <Switch.Thumb className='block w-5 h-5 bg-white rounded-full translate-x-1 data-[state=checked]:translate-x-5 transition-transform' />
                  </Switch.Root>
                </div>
                <p className='text-base text-gray-500 py-2' id={descriptionId}>
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        <div className='mt-6 flex justify-end gap-3 text-lg'>
          <button
            onClick={closeModal}
            className='bg-white border border-gray-400 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-gray-100'
          >
            {t('buttons.cancel')}
          </button>
          <button
            onClick={onConfirmPreferences}
            className='bg-bossanova-cyan text-white px-4 py-2 rounded-md font-medium hover:cursor-pointer hover:bg-bossanova-green'
          >
            {t('buttons.savePreferences')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;