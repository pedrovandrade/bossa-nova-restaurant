import Link from 'next/link';
import { DropdownMenu } from 'radix-ui';
import { type FC } from 'react';
import { type LanguageOption } from '../Header';

type HeaderLanguageListProps = {
  languageOptions: LanguageOption[];
}

const HeaderLanguageList: FC<HeaderLanguageListProps> = ({ languageOptions, ...props }) => {
  return (
    <>
      {languageOptions.map((lang) => (
        <DropdownMenu.Item
          asChild
          key={lang.label}
          className="hover:bg-bossanova-green focus:bg-bossanova-green rounded transition duration-200"
          {...props}
        >
          <Link href={lang.url} className="flex items-center px-8 md:px-4 py-3 gap-6">
            <div className="w-6 flex">
              {lang.icon}
            </div>
            {lang.label}
          </Link>
        </DropdownMenu.Item>
      ))}
    </>
  );
};

export default HeaderLanguageList;