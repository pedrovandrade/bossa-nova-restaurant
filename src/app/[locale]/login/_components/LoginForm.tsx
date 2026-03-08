import { type FC } from 'react';
import * as Form from '@radix-ui/react-form';
import LoginFormInput from './LoginFormInput';
import { useTranslations } from 'next-intl';
import { Key, Mail } from '@/components/_icons';

type Props = {
  action: (formData: FormData) => Promise<void>;
};

const LoginForm: FC<Props> = ({ action }) => {
  const t = useTranslations('pages.login.form');

  return (
    <div className={[
        'mx-auto',
        'my-auto',
        'flex',
        'flex-col',
        'grow',
        'justify-center',
        'items-center',
        'border',
        'border-slate-400',
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
        action={action}
        method='POST'
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
            minLength: {
              value: 6,
              message: t('errors.password.tooShort'),
            },
          }}
        />
          <Form.Submit
            className='bg-bossanova-cyan hover:bg-bossanova-cyan/95 text-white font-bold p-3 rounded-full'
          >
            {t('submitButton')}
          </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default LoginForm;