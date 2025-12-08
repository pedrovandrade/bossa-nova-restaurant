import { useTranslations } from 'next-intl';
import { type FC } from 'react';
import { DropdownMenu } from 'radix-ui';
import HeaderLanguageList from './HeaderLanguageList';
import { HeaderLanguageListProps } from '@/components/Header';
import Chevron from '@/components/_icons/Chevron';
import { getPointColorClass } from '@/components/Header/HeaderNav';

type HeaderLanguageSelectorProps = HeaderLanguageListProps & {
  currentLocale: string;
};

const HeaderLanguageSelector: FC<HeaderLanguageSelectorProps> = ({ languageOptions, currentLocale }) => {
  const t = useTranslations('header');
  const currentLanguage = languageOptions.find(lang => lang.locale === currentLocale);
  const pointColorClass = getPointColorClass('yellow');

  return (
    <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger className={[
            'group',
            'text-lg',
            'hover:cursor-pointer',
            'hover:bg-bossanova-green',
            'rounded',
            'transition',
            'duration-300',
            'p-3',
            'hidden',
            'md:block',
            'p-3',
          ].join(' ')}
        >
          {
            currentLanguage ? (
              <div className='flex items-center gap-6'>
                <div className='w-5'>
                  {currentLanguage.icon}
                </div>
                <div className='flex'>
                  <div className={[
                      'relative',
                      'before:content-[" "]',
                      'before:block',
                      'before:relative',
                      'before:mx-auto',
                      'before:-bottom-full',
                      'before:w-1',
                      'before:h-1',
                      'before:rounded-full',
                      'before:transition-all',
                      'before:duration-300',
                      'group-hover:before:w-full',
                      pointColorClass,
                    ].join(' ')}
                  >
                    {currentLanguage.label}
                  </div>
                </div>
                <Chevron className='group-data-[state=open]:rotate-180' />
              </div>
            ) : (
              t('language')
            )
          }
        </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={[
            'bg-bossanova-cyan',
            'text-white',
            'p-2',
            'mt-5',
            'rounded shadow-lg',
            'z-200',
            'animate-dropdown-menu-fade-in',
            'data-[state=closed]:animate-dropdown-menu-fade-out'
          ].join(' ')}
        >
          <HeaderLanguageList languageOptions={languageOptions} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HeaderLanguageSelector;