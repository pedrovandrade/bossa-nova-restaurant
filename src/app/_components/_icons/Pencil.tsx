import { FC } from 'react';

const Pencil: FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M 16.862 4.487 l 1.687 -1.688 a 1.875 1.875 0 112.652 2.652 L 10.582 16.07 a 4.5 4.5 0 01-1.897 1.13 L 6 18 l .8 -2.685 a 4.5 4.5 0 011.13-1.897 l 8.932 -8.931 z m 0 0 L 19.5 7.125 M 18 .375'
      />
    </svg>
  );
};

export default Pencil;