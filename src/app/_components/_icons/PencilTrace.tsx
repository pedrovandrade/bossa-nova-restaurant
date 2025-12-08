import { FC } from 'react';

type PencilTraceProps = {
  /** CSS color used for the trace (defaults to pencil graphite) */
  color?: string;
  secondaryColor?: string;
  /** SVG width (number treated as px, string passed through) */
  width?: number | string;
  /** Multiplier applied to stroke widths (1 by default) */
  thickness?: number;
  id: string;
};

const PencilTrace: FC<PencilTraceProps> = ({
  color = '#2b2b2b',
  secondaryColor,
  width = 120,
  thickness = 1,
  id,
}) => {
  const BASE_W = 120;
  const BASE_H = 48;

  const svgWidth = typeof width === 'number' ? `${width}` : width;
  const svgHeight = typeof width === 'number' ? Math.round((width * BASE_H) / BASE_W) : BASE_H;

  const mainStroke = 7.5 * thickness;
  const coreStroke = 2.2 * Math.max(0.5, thickness);
  const highlightStroke = 0.6 * Math.max(0.5, thickness);
  const curlStroke = 4 * Math.max(0.5, thickness);

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox='0 0 120 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      className='inline-block'
      id={id}
    >
      <defs>
        {/* subtle roughness to mimic pencil grain */}
        <filter id='pencil-grain' x='-20%' y='-20%' width='140%' height='140%'>
          <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='noise' />
          <feColorMatrix in='noise' type='saturate' values='0' result='monoNoise' />
          <feComponentTransfer in='monoNoise' result='masked'>
            <feFuncA type='table' tableValues='0 0 0.25 0.5' />
          </feComponentTransfer>
          <feBlend in='SourceGraphic' in2='masked' mode='overlay' />
          <feDisplacementMap
            in='SourceGraphic'
            in2='monoNoise'
            scale='1.5'
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>

        {/* a slight blur for the softer pencil edge */}
        <filter id='soft-edge' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='0.25' />
        </filter>

        {/* graphite-like gradient using the provided color */}
        <linearGradient id={`graphite-${id}`} x1='0' x2='1' y1='0' y2='0'>
          <stop offset='0' stopColor={secondaryColor || color} stopOpacity='0.95' />
          <stop offset='0.6' stopColor={secondaryColor || color} stopOpacity='1' />
          <stop offset='1' stopColor={secondaryColor || color} stopOpacity='0.85' />
        </linearGradient>
      </defs>

      {/* thicker rough base stroke (gives the graphite mass) */}
      <path
        d='M6 34 C 28 26, 72 18, 112 24'
        stroke={`url(#graphite-${id})`}
        strokeWidth={mainStroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
        filter='url(#pencil-grain)'
        style={{ paintOrder: 'stroke' }}
      />

      {/* thinner central line for the sharpened core */}
      <path
        d='M6 34 C 28 26, 72 18, 112 24'
        stroke={color}
        strokeWidth={coreStroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
        filter='url(#soft-edge)'
        opacity={Math.max(0.7, thickness >= 1 ? 1 : 0.9)}
      />

      {/* subtle highlight near the beginning to simulate pressure */}
      <path
        d='M10 33 C 28 27, 72 20, 110 26'
        stroke='#ffffff'
        strokeWidth={highlightStroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
        opacity='0.12'
      />

      {/* slight curl at the start (graphite blob) */}
      <path
        d='M4 36 C 6 34, 9 34, 10 33'
        stroke={color}
        strokeWidth={curlStroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
        opacity='0.95'
        filter='url(#pencil-grain)'
      />
    </svg>
  );
};

export default PencilTrace;