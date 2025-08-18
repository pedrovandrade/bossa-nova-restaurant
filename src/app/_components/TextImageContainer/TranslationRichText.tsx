import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
 
// These tags are available
type Tag = 'p' | 'reservationLink' | 'menuLink';
 
type Props = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode
};
 
export default function TranslationRichText({ children }: Props) {
  return (
    <>
      {children({
        p: (chunks: ReactNode) => (
          <p className='text-slate-700'>{chunks}</p>
        ),
        reservationLink: (chunks: ReactNode) => (
          <div className='mt-10'>
            <Link
              href='/reservations'
              className='text-slate-700 uppercase px-8 py-5 font-semibold hover:text-bossanova-cyan bg-bossanova-yellow rounded transition duration-300'
            >
                {chunks}
            </Link>
          </div>
        ),
        menuLink: (chunks: ReactNode) => (
          <div className='mt-10'>
            <Link
              href='/menu'
              className='text-slate-700 uppercase px-8 py-5 font-semibold hover:text-bossanova-cyan bg-bossanova-yellow rounded transition duration-300'
            >
              {chunks}
            </Link>
          </div>
        ),
      })}
    </>
  );
}