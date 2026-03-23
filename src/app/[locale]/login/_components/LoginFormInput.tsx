'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form } from 'radix-ui';
import type {
  FC,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  JSX
} from 'react';
import { OpenEye, TracedEye } from '@/app/_components/_icons';

type LoginFormInputProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  icon?: JSX.Element;
  validators?: Partial<Record<'required' | 'minLength' | 'maxLength' | 'type', {
    value: boolean | number | string;
    message: string;
  }>>;
};

const LoginFormInput: FC<LoginFormInputProps> = ({ name, type, validators, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  let autoCompleteValue: HTMLInputAutoCompleteAttribute = '';

  const t = useTranslations('pages.login.form.labels');
  const label = t(name);

  switch (type) {
    case 'email':
      autoCompleteValue = 'email';
      break;
    case 'password':
      autoCompleteValue = 'current-password';
      break;
    default:
      autoCompleteValue = 'off';
  }

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <Form.Field name={name} className='w-full'>
      <div className={[
          'flex',
          'grow',
          'items-center',
          'rounded-3xl',
          'border',
          'border-slate-400',
          'px-3',
        ].join(' ')}
      >
        {/* Icon */}
        {icon && (
          <div className='pr-2 mr-3 text-gray-500'>
            {icon}
          </div>
        )}
        <div className='relative w-full'>
          <Form.Control
            id={name}
            name={name}
            type={inputType}
            autoComplete={autoCompleteValue}
            placeholder=' '
            required={Boolean(validators?.required?.value)}
            className={[
              'peer',
              'w-full',
              'pt-8',
              'pb-3',
              'outline-none',
              'text-2xl',
              isPassword ? 'pr-12' : '',
            ].join(' ')}
          />
          <Form.Label
            htmlFor={name}
            className={[
              'pointer-events-none',
              'absolute',
              'left-0',
              'top-1/2',
              '-translate-y-1/2',
              'text-2xl',
              'text-gray-500',
              'transition-all',
              'peer-focus:top-2',
              'peer-focus:text-base',
              'peer-focus:-translate-y-0',
              'peer-not-placeholder-shown:top-2',
              'peer-not-placeholder-shown:text-base',
              'peer-not-placeholder-shown:-translate-y-0',
            ].join(' ')}
          >
            {label}
          </Form.Label>

          {isPassword && (
            <button
              type="button"
              onClick={toggleShowPassword}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                // eye with diagonal trace (hidden)
                <TracedEye />
              ) : (
                // open eye
                <OpenEye />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Validation Messages */}
      <div className='min-h-7 text-lg text-red-600 mt-1'>
        {validators?.minLength && (
          <Form.Message match='tooShort'>
            {validators.minLength.message}
          </Form.Message>
        )}
        {validators?.maxLength && (
          <Form.Message match='tooLong'>
            {validators.maxLength.message}
          </Form.Message>
        )}
        {validators?.type && (
          <Form.Message match='typeMismatch'>
            {validators.type.message}
          </Form.Message>
        )}
        {validators?.required && (
          <Form.Message match='valueMissing'>
            {validators.required.message}
          </Form.Message>
        )}
      </div>
    </Form.Field>
  );
}

export default LoginFormInput;