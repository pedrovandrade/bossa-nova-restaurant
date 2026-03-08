import { FC } from 'react';

const OpeningHours: FC = () => {
  return (
    <div className='bg-bossanova-beige text-bossanova-brown p-4 rounded-md shadow-md shadow-black/25 max-w-md mx-auto'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Opening Hours</h2>
      <ul className='space-y-2'>
        <li className='flex justify-between'>
          <span>Monday - Friday:</span>
          <span>11:00 AM - 10:00 PM</span>
        </li>
        <li className='flex justify-between'>
          <span>Saturday:</span>
          <span>12:00 PM - 11:00 PM</span>
        </li>
        <li className='flex justify-between'>
          <span>Sunday:</span>
          <span>Closed</span>
        </li>
      </ul>
    </div>
  );
};

export default OpeningHours;