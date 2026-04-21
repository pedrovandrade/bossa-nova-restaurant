'use client';

import { FormEvent, useState, type FC } from 'react';
import * as Form from '@radix-ui/react-form';
import LoginFormInput from './LoginFormInput';
import { useTranslations } from 'next-intl';
import { Key, Mail } from '@/components/_icons';
import { useRouter } from 'next/navigation';

const LoginForm: FC = () => {
  const t = useTranslations('pages.login.form');
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    setErrorMessage('');
 
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
 
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setIsPending(false);
 
    if (response.ok) {
      router.refresh();
    } else {
      const { messageCode } = await response.json();
      setErrorMessage(t(`errors.http.${messageCode}`));
    }
  };

  return (
    <div className={[
        'mx-auto',
        'my-auto',
        'flex',
        'flex-col',
        'grow',
        'justify-center',
        'items-center',
        'px-8',
        'sm:px-16',
        'w-full',
        'sm:max-w-160',
        'bg-white',
        'shadow-lg',
      ].join(' ')}
    >
      <Form.Root
        className='flex flex-col gap-5 w-full'
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Email field */}
        <LoginFormInput
          name='email'
          type='email'
          icon={<Mail />}
          validators={{
            required: {
              value: true,
              message: t('errors.email.valueMissing'),
            },
            type: {
              value: 'email',
              message: t('errors.email.typeMismatch'),
            },
          }}
        />
        {/* Password field */}
        <LoginFormInput
          name='password'
          type='password'
          icon={<Key />}
          validators={{
            required: {
              value: true,
              message: t('errors.password.valueMissing'),
            },
          }}
        />
          {errorMessage && (
            <>
              <p className="text-xl text-red-500">{errorMessage}</p>
            </>
          )}
          <Form.Submit
            className={[
              'bg-bossanova-cyan',
              'hover:bg-bossanova-green',
              'hover:cursor-pointer',
              'text-white',
              'font-bold',
              'p-4',
              'rounded-full',
              'disabled:bg-bossanova-cyan/50',
              'disabled:cursor-not-allowed',
            ].join(' ')}
            aria-disabled={isPending}
            disabled={isPending}
          >
            {t('submitButton')}
          </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default LoginForm;