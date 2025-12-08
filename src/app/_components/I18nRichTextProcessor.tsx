import { FC, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import PencilTrace from '@/components/_icons/PencilTrace';
 
// These tags are available
type Tag =
  'p' |
  'h1' |
  'h2' |
  'ul' |
  'li' |
  'strong' |
  'rgpdLink' |
  'googleMapsDataLink' |
  'instagramDataLink' |
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

type I18nRichTextProcessorProps = {
  params?: RichTextParams,
  tagClassNames?: Partial<Record<Tag, string>>,
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode
};
 
const I18nRichTextProcessor: FC<I18nRichTextProcessorProps> = ({ params, tagClassNames, children }) => {
  const defaultParams: RichTextParams = {
    reservationUrl: "#",
    phoneNumber: "#",
  };

  return (
    <>
      {children({
        // Ordinary paragraph
        p: (chunks: ReactNode) => (
          <p className={`text-slate-700 ${tagClassNames?.p || ''}`}>{chunks}</p>
        ),
        h1: (chunks: ReactNode) => (
          <h1 className={`text-4xl font-bold text-slate-900 ${tagClassNames?.h1 || ''}`}>{chunks}</h1>
        ),
        h2: (chunks: ReactNode) => (
          <h2 className={`text-3xl font-semibold text-slate-900 ${tagClassNames?.h2 || ''}`}>{chunks}</h2>
        ),
        ul: (chunks: ReactNode) => (
          <ul className={`list-disc list-inside mb-4 ${tagClassNames?.ul || ''}`}>{chunks}</ul>
        ),
        li: (chunks: ReactNode) => (
          <li className={`mb-2 text-slate-700 ${tagClassNames?.li || ''}`}>{chunks}</li>
        ),
        strong: (chunks: ReactNode) => (
          <strong className={`font-semibold text-slate-900 ${tagClassNames?.strong || ''}`}>{chunks}</strong>
        ),
        // Link to GDPR policy page
        rgpdLink: (chunks: ReactNode) => (
          <a
            href='https://www.cnil.fr/fr/reglement-europeen-protection-donnees'
            target='_blank'
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${tagClassNames?.rgpdLink || ''}`}
          >
            {chunks}
          </a>
        ),
        // Link to Google Maps data policy
        googleMapsDataLink: (chunks: ReactNode) => (
          <Link
            href='https://policies.google.com/privacy?hl=en'
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${tagClassNames?.googleMapsDataLink || ''}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {chunks}
          </Link>
        ),
        // Link to Instagram data policy
        instagramDataLink: (chunks: ReactNode) => (
          <Link
            href='https://help.instagram.com/519522125107875'
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${tagClassNames?.instagramDataLink || ''}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {chunks}
          </Link>
        ),
        // Link button to reservation page
        reservationPageLink: (chunks: ReactNode) => (
          <div className='mt-10'>
            <Link
              href='/reservations'
              className={`text-slate-700 uppercase py-5 font-semibold hover:text-bossanova-cyan rounded transition duration-300 ${tagClassNames?.reservationPageLink || ''}`}
            >
                {chunks}
            </Link>
            <div className='relative -top-3.5'>
              <PencilTrace id='pencil-trace-1' color='#007932' secondaryColor='#008942' width={140} thickness={0.7} />
            </div>
          </div>
        ),
        // Link button to menu page
        menuPageLink: (chunks: ReactNode) => (
          <div className='mt-10'>
            <Link
              href='/menu'
              className={`text-slate-700 uppercase py-5 font-semibold hover:text-bossanova-cyan rounded transition duration-300 ${tagClassNames?.menuPageLink || ''}`}
            >
              {chunks}
              <div className='relative -top-3.5'>
                <PencilTrace id='pencil-trace-2' color='#ee71bf' secondaryColor='#ff81cd' width={140} thickness={0.7} />
            </div>
            </Link>
          </div>
        ),
        privacyPolicyLink: (chunks: ReactNode) => (
          <Link
            href='/privacy-policy'
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${tagClassNames?.privacyPolicyLink || ''}`}
          >
            {chunks}
          </Link>
        ),
        // External reservation link
        reservationLink: (chunks: ReactNode) => (
          <Link
            href={params?.reservationUrl || defaultParams.reservationUrl}
            className={`text-bossanova-green hover:text-bossanova-blue hover:cursor-pointer ${tagClassNames?.reservationLink || ''}`}
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
            className={`text-bossanova-cyan hover:text-bossanova-green ${tagClassNames?.telephoneLink || ''}`}
          >
            {params?.phoneNumber.replace('+33', '0').split('').map((n, i) => i%2 !== 0 ? n + ' ' : n).join('')}
          </Link>
        ),
        // Email link
        emailLink: (chunks: ReactNode) => (
          <Link
            href='mailto:bossanovatoulouse@gmail.com'
            className={`text-bossanova-cyan hover:text-bossanova-green ${tagClassNames?.emailLink || ''}`}
          >
            {chunks}
          </Link>
        ),
      })}
    </>
  );
};

export default I18nRichTextProcessor;