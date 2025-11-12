'use client';

import type { FC } from 'react';
import Chevron from '@/components/_icons/Chevron';
import { useTranslations } from 'next-intl';

type ScrollButtonProps = {
  direction: 'previous' | 'next';
  onClick: () => void;
};

const ScrollButton: FC<ScrollButtonProps> = ({ direction, onClick }) => {
  const t = useTranslations('carrousel');
  const ariaLabel = direction === 'previous' ? t('previous') : t('next');

  const chevronClass = direction === 'previous' ? 'rotate-90' : '-rotate-90';
  const buttonPositionClass = direction === 'previous' ? 'left-0 md:-left-5' : 'right-0 md:-right-5';

  return (
    <div className={`absolute inset-y-auto md:inset-y-0 flex items-center z-20 ${buttonPositionClass}`}>
      <button
        className='bg-bossanova-cyan text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:cursor-pointer'
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <Chevron className={chevronClass} />
      </button>
    </div>
  );
};

export default ScrollButton;