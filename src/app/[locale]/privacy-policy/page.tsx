import { FC } from 'react';

const PrivacyPolicyPage: FC = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8'>
      <h1 className='text-4xl font-bold mb-6'>Privacy Policy</h1>
      <p className='text-lg text-center max-w-3xl'>
        This is the privacy policy page. Here you can detail how user data is collected, used, and protected.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;