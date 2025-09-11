import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type FC, useState } from 'react';
import { DropdownMenu, Accordion } from 'radix-ui';
import { BurgerMenu } from '@components/_icons';
import { HeaderLanguageList } from '@components/Header/HeaderLanguageSelector';
import { HeaderLanguageListProps } from '@components/Header';
import Chevron from '@components/_icons/Chevron';

const HeaderNavMobile: FC<HeaderLanguageListProps> = ({ languageOptions, siteLinks }) => {

  const t = useTranslations('header');
  const [accordionTabSelected, setAccordionTabSelected] = useState<string | undefined>('');

  const onLanguageSelectorOpenChange = (e: Event) => {
    e.preventDefault();
    setAccordionTabSelected((prevValue) => prevValue === 'value-1' ? '' : 'value-1');
  };

  return (
    <nav className='block md:hidden'>
      <DropdownMenu.Root modal={true}>
        <DropdownMenu.Trigger
          className="hover:cursor-pointer hover:bg-bossanova-green focus:bg-bossanova-green rounded transition duration-300 p-2"
        >
          <div className='w-8'>
            <BurgerMenu />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            hideWhenDetached={true}
            align='start'
            className={[
              'max-h-[calc(100vh-5.5rem)]',
              'overflow-y-scroll',
              'bg-bossanova-cyan',
              'text-white',
              'p-1',
              'mt-5 mx-1',
              'rounded shadow-lg',
              'z-200',
              'animate-dropdown-menu-fade-in',
              'data-[state=closed]:animate-dropdown-menu-fade-out',
              'w-[calc(var(--radix-dropdown-menu-content-available-width)-0.5rem)]',
            ].join(' ')}
          >
            {siteLinks?.map((item) => (
              <DropdownMenu.Item
                key={item.name}
                className="hover:bg-bossanova-green focus:bg-bossanova-green rounded w-full px-8 py-4 font-medium"
                asChild
              >
                <Link href={item.href} className="flex items-center">
                  {t(`nav.${item.name}`)}
                </Link>
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Item
              onSelect={onLanguageSelectorOpenChange}
              className='group focus:first:bg-bossanova-green'
              asChild
            >
              <Accordion.Root type='single' value={accordionTabSelected} collapsible asChild>
                <Accordion.Item value='value-1' className="w-full">
                  <Accordion.Trigger
                    className="flex justify-between group-focus:bg-bossanova-green hover:cursor-pointer hover:bg-bossanova-green focus:bg-bossanova-green rounded p-2 w-full px-8 py-4 font-medium"
                  >
                    <p>{t('language')}</p>
                    <Chevron className='group-data-[state=open]:rotate-180' />
                  </Accordion.Trigger>
                  <Accordion.Content
                    className={[
                      'font-light',
                      'z-200',
                      'data-[state=open]:animate-accordion-menu-slide-down',
                      'data-[state=closed]:animate-accordion-menu-slide-up',
                      'overflow-hidden',
                    ].join(' ')}
                  >
                    <HeaderLanguageList languageOptions={languageOptions} />
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
}

export default HeaderNavMobile;