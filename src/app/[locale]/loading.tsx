import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div
      role='status'
      aria-busy='true'
      className='p-6 w-full max-w-4xl mx-auto'
    >
      <span className='sr-only'>Loading…</span>

      <div className='animate-pulse space-y-6' aria-hidden>
        <div className='flex items-start gap-6'>
          {/* image skeleton */}
          <div className='w-36 h-36 bg-gray-200 dark:bg-gray-300 rounded-lg' />

          {/* text skeleton */}
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-6 bg-gray-200 dark:bg-gray-300 rounded w-3/4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-300 rounded w-1/2' />
            <div className='h-4 bg-gray-200 dark:bg-gray-300 rounded w-2/3' />
            <div className='h-3 bg-gray-200 dark:bg-gray-300 rounded w-5/6 mt-4' />
          </div>
        </div>

        {/* multiple content blocks */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='space-y-3'>
            <div className='h-32 bg-gray-200 dark:bg-gray-300 rounded' />
            <div className='h-4 bg-gray-200 dark:bg-gray-300 rounded w-5/6' />
          </div>

          <div className='space-y-3'>
            <div className='h-32 bg-gray-200 dark:bg-gray-300 rounded' />
            <div className='h-4 bg-gray-200 dark:bg-gray-300 rounded w-3/4' />
          </div>

          <div className='space-y-3'>
            <div className='h-32 bg-gray-200 dark:bg-gray-300 rounded' />
            <div className='h-4 bg-gray-200 dark:bg-gray-300 rounded w-2/3' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;