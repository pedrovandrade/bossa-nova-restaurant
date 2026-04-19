import { useMessages, useTranslations } from 'next-intl';
import { FC } from 'react';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import I18nRichTextProcessor from '@/components/I18nRichTextProcessor';
import { Cookie } from '@/components/_icons';
import FadeInContainer from '@/components/FadeInContainer';

type CookieConsentBannerProps = {
  isOpen?: boolean,
  onAcceptAll: () => void,
  onRefuseAll: () => void,
  onOpenPreferences: () => void,
};

type BannerButtonData = {
  text: string,
  onClick: () => void,
};

const CookieConsentBanner: FC<CookieConsentBannerProps> = ({ isOpen, onAcceptAll, onRefuseAll, onOpenPreferences }) => {

  const messages = useMessages();
  const paragraphMap = messages.cookies.banner.description as {[key: string]: string};

  const paragraphKeys: string[] = Object.keys(paragraphMap);
  const t = useTranslations('cookies.banner');

  const buttonsData: BannerButtonData[] = [
    {
      text: t('buttons.acceptAll'),
      onClick: onAcceptAll,
    },
    {
      text: t('buttons.refuseAll'),
      onClick: onRefuseAll,
    },
    {
      text: t('buttons.managePreferences'),
      onClick: onOpenPreferences,
    },
  ];

  return (
    <Dialog.Root
      open={isOpen}
    >
      <Portal>
        <Dialog.Backdrop className='fixed inset-0 z-[10000] bg-black/40' />
        <Dialog.Positioner className='fixed w-full z-[10000] bottom-0'>
          <Dialog.Content className='bg-white/95 backdrop-blur-sm border border-gray-200 shadow-[0_0_35px_rgba(0,0,0,0.55)] px-8 md:px-15 pt-8 pb-8 md:pb-15'>
            <div className='w-15 text-bossanova-green'><Cookie /></div>
            <Dialog.Title className='text-2xl text-bossanova-cyan font-bold'>
              {t('title')}
            </Dialog.Title>
            <div className='flex flex-col xl:flex-row items-center md:items-end justify-center gap-6'>
             <div className='flex-1 text-base md:text-lg text-gray-800'>
               {paragraphKeys.map((paragraphKey) => (
                <FadeInContainer key={`paragraphKey-${paragraphKey}`}>
                  <I18nRichTextProcessor>
                    {(tags) => t.rich(`description.${paragraphKey}`, tags)}
                  </I18nRichTextProcessor>
                </FadeInContainer>
              ))}
            </div>

            <div className='flex flex-col md:flex-row w-fit md:w-full lg:w-fit justify-start items-center gap-2'>
              {buttonsData.map((buttonData, index) => {
                const { text, onClick } = buttonData;
                return (
                  <button
                    key={index}
                    onClick={onClick}
                    className='bg-bossanova-cyan w-full md:w-fit text-white rounded-md px-8 py-2 hover:cursor-pointer hover:bg-bossanova-green border transition-colors'
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CookieConsentBanner;