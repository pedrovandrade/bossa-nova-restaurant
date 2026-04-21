import React from 'react';

type LoaderIconProps = {
  /** Icon size in px or any valid CSS size (default: 24) */
  size?: number | string;
  /** Stroke width of the spinner (default: 2) */
  strokeWidth?: number;
  /** Additional CSS classes (e.g. to set color) */
  className?: string;
  /** Accessible label (default: 'Loading') */
  ariaLabel?: string;
};

/**
 * Accessible spinning loader SVG.
 *
 * Renders a circular spinner using currentColor. Uses Tailwind `animate-spin`
 * if available; otherwise will still render the SVG (you can add your own CSS
 * animation targeting the `animate-spin` class).
 *
 * @param props LoaderProps
 * @returns JSX.Element
 */
const LoaderIcon: React.FC<LoaderIconProps> = ({
  size = 24,
  strokeWidth = 2,
  className = '',
  ariaLabel = 'Loading',
}) => {
  return (
    <svg
      role='img'
      aria-label={ariaLabel}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={`animate-spin ${className}`}
      fill='none'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        opacity='0.25'
      />
      <path
        d='M22 12a10 10 0 0 0-10-10'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LoaderIcon;