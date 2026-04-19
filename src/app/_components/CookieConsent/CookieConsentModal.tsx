import { FC } from 'react';
import { Switch } from '@ark-ui/react/switch';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { CookiePreferences } from './CookieConsent';
import { Cross } from '@/components/_icons';
import { useTranslations } from 'next-intl';

type CookieConsentModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  localPreferences: CookiePreferences;
  setCookiePreference: (name: string, value: boolean) => void;
  onConfirmPreferences: () => void;
};

const CookieConsentModal: FC<CookieConsentModalProps> = ({
  isOpen,
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
    <Dialog.Root
      open={isOpen}
      onInteractOutside={closeModal}
      onEscapeKeyDown={closeModal}
    >
      <Portal>
        <Dialog.Backdrop
          className='fixed inset-0 z-[10000] bg-black/40'
          onClick={closeModal}
        />
        <Dialog.Positioner className='fixed inset-0 z-[10000] flex items-end md:items-center justify-center'>
          <Dialog.Content className='relative w-full max-w-3xl bg-white rounded-lg shadow-xl px-6 md:px-14 py-6 md:py-10 z-10'>

            <Dialog.CloseTrigger
              className='absolute top-3 h-8 w-8 text-gray-500 right-3 p-1 rounded hover:bg-gray-100'
              aria-label={t('closeButtonAriaLabel')}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  event.preventDefault();
                  closeModal();
                }
              }}
            >
              <Cross />
            </Dialog.CloseTrigger>

            <Dialog.Title className='text-3xl text-bossanova-cyan font-semibold mb-4'>
              {t('title')}
            </Dialog.Title>

            <div className='space-y-8'>
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
                          'h-7',
                          'rounded-full',
                          'relative',
                          'data-[focus-visible]:ring-2',
                          checked ? 'bg-bossanova-cyan' : 'bg-gray-400',
                          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                        ].join(' ')}
                        checked={checked}
                        onCheckedChange={(e) => setCookiePreference(name, e.checked)}
                        disabled={disabled}
                        aria-label={ariaLabel}
                        aria-describedby={descriptionId}
                      >
                        <Switch.Control asChild>
                          <Switch.Thumb
                            className={[
                              'block w-5 h-5',
                              'bg-white',
                              'rounded-full',
                              'translate-1',
                              'data-[state=checked]:translate-x-5',
                              'transition-transform',
                            ].join(' ')}
                          />
                        </Switch.Control>
                        <Switch.HiddenInput className='peer' />
                      </Switch.Root>
                    </div>
                    <p className='text-gray-500 py-2' id={descriptionId}>
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className='mt-6 flex justify-end gap-3'>
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

          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CookieConsentModal;