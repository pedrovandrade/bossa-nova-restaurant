import { FC } from 'react';

type TracedEyeProps = {
  width?: number;
  height?: number;
};

const TracedEye: FC<TracedEyeProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.33 0-9.35-3.11-11-8 1.07-2.8 2.86-5 5.06-6.47'></path>
      <path d='M1 1l22 22' />
      <path d='M9.88 9.88a3 3 0 0 0 4.24 4.24' />
    </svg>
  );
};

export default TracedEye;