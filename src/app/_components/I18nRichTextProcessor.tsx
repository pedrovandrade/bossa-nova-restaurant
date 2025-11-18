import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
 
// These tags are available
type Tag =
  'p' | 
  'reservationPageLink' | 
  'menuPageLink' |
  'privacyPolicyLink' |
  'reservationLink' |
  'telephoneLink' |
  'emailLink';
 
export type RichTextParams = {
  reservationUrl: string,
  phoneNumber: string,
};

type Props = {
  params?: RichTextParams,
  className?: string,
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode
};
 
export default function I18nRichTextProcessor({ params, className = '', children }: Props) {
  const defaultParams: RichTextParams = {
    reservationUrl: "#",
    phoneNumber: "#",
  };

  return (
    <>
      {children({
        // Ordinary paragraph
        p: (chunks: ReactNode) => (
          <p className={`text-slate-700 ${className}`}>{chunks}</p>
        ),
        // Link button to reservation page
        reservationPageLink: (chunks: ReactNode) => (
          <div className='mt-10'>
            <Link
              href='/reservations'
              className={`text-slate-700 uppercase px-8 py-5 font-semibold hover:text-bossanova-cyan bg-bossanova-yellow rounded transition duration-300 ${className}`}
            >
                {chunks}
            </Link>
          </div>
        ),
        // Link button to menu page
        menuPageLink: (chunks: ReactNode) => (
          <div className='mt-10'>
            <Link
              href='/menu'
              className={`text-slate-700 uppercase px-8 py-5 font-semibold hover:text-bossanova-cyan bg-bossanova-yellow rounded transition duration-300 ${className}`}
            >
              {chunks}
            </Link>
          </div>
        ),
        privacyPolicyLink: (chunks: ReactNode) => (
          <Link
            href='/privacy-policy'
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${className}`}
          >
            {chunks}
          </Link>
        ),
        // External reservation link
        reservationLink: (chunks: ReactNode) => (
          <Link
            href={params?.reservationUrl || defaultParams.reservationUrl}
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${className}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {chunks}
          </Link>
        ),
        // Telephone link
        telephoneLink: () => (
          <Link
            href={`tel:${params?.phoneNumber || defaultParams.phoneNumber}`}
            className={`text-bossanova-cyan hover:text-bossanova-green ${className}`}
          >
            {params?.phoneNumber.replace('+33', '0').split('').map((n, i) => i%2 !== 0 ? n + ' ' : n).join('')}
          </Link>
        ),
        // Email link
        emailLink: (chunks: ReactNode) => (
          <Link
            href='mailto:bossanovatoulouse@gmail.com'
            className={`text-bossanova-cyan hover:text-bossanova-green ${className}`}
          >
            {chunks}
          </Link>
        ),
      })}
    </>
  );
}