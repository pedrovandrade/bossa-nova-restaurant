import { FC } from 'react';

type OpenEyeProps = {
  width?: number;
  height?: number;
};

const OpenEye: FC<OpenEyeProps> = ({ width = 20, height = 20 }) => {
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
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
      <circle cx='12' cy='12' r='3'></circle>
    </svg>
  );
};

export default OpenEye;