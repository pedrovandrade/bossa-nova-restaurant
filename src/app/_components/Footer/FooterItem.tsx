import { FC, PropsWithChildren } from 'react';

type FooterItemProps = PropsWithChildren & {
  title: string;
  id?: string;
};

const FooterItem: FC<FooterItemProps> = ({ title, id, children }) => {
    return (
        <div className='px-0 md:px-4 py-6' id={id || undefined}>
            <h2 className='text-xl font-bold mb-2'>{title}</h2>
            <div className='space-y-1'>
                {children}
            </div>
        </div>
    );
};

export default FooterItem;