import { FC } from 'react';

const LinkIcon: FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.498 4.498 0 01-6.364-6.364l1.757-1.757m13.35-.622a4.498 4.498 0 00-6.364-6.364l-4.5 4.5a4.498 4.498 0 006.364 6.364l1.757-1.757'
      />
    </svg>
  );
};

export default LinkIcon;