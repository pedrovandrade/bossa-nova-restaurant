'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { useLocale, useTranslations } from 'next-intl';
import { Cross } from '@/components/_icons';
import { CurrentLocale, LocalizedText } from '@/types/LocalizedText';

type MarketingPopinProps = {
  isActive: boolean;
  image: string;
  description: LocalizedText;
};

const MarketingPopin: FC<MarketingPopinProps> = ({ isActive, image, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('cookies.modal');

  const currentLocale = useLocale();

  const closeModal = () => {
    setIsOpen(false);
  };

  const imgAlt = description[currentLocale as CurrentLocale] || t('defaultImageAlt');

  useEffect(() => {
    if (isActive && image) {
      setIsOpen(true);
    }
  }, [image, isActive]);
  
  return (
    <Dialog.Root
      open={isOpen}
      onInteractOutside={closeModal}
      onEscapeKeyDown={closeModal}
    >
      <Portal>
        <Dialog.Backdrop
          className='fixed inset-0 z-[10000] bg-black/70'
          onClick={closeModal}
        />
        <Dialog.Positioner
          className='fixed inset-0 z-[10000] flex items-end md:items-center justify-center'
          onClick={closeModal}
        >
          <Dialog.Content className='h-full w-full max-h-[90vh] rounded-lg p-0 relative'>
            <Image
              src={image}
              alt={imgAlt}
              style={{objectFit: 'contain'}}
              fill
              className='rounded-lg h-full'
            />
            <Dialog.CloseTrigger
              className='absolute top-3 h-8 w-8 text-white right-3 p-1 rounded bg-bossanova-cyan hover:bg-gray-100 hover:cursor-pointer'
              aria-label={t('closeButtonAriaLabel')}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  event.preventDefault();
                  closeModal();
                }
              }}
              onClick={closeModal}
            >
              <Cross />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default MarketingPopin;