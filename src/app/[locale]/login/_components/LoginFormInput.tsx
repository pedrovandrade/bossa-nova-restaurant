
import { useTranslations } from 'next-intl';
import { Form } from 'radix-ui';
import type {
  FC,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  JSX
} from 'react';

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

  return (
    <Form.Field name={name} className='w-full'>
      <div className={[
          'flex',
          'grow',
          'items-center',
          'rounded-xl',
          'border',
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
            type={type}
            autoComplete={autoCompleteValue}
            placeholder=' '
            required={Boolean(validators?.required?.value)}
            className={[
              'peer',
              'w-full',
              'pt-7',
              'pb-2',
              'outline-none',
            ].join(' ')}
          />
          <Form.Label
            htmlFor={name}
            className={[
              'pointer-events-none',
              'absolute',
              'left-3',
              'top-1/2',
              '-translate-y-1/2',
              'text-lg',
              'text-gray-500',
              'transition-all',
              'peer-focus:top-2',
              'peer-focus:text-sm',
              'peer-focus:-translate-y-0',
              'peer-not-placeholder-shown:top-2',
              'peer-not-placeholder-shown:text-sm',
              'peer-not-placeholder-shown:-translate-y-0',
            ].join(' ')}
          >
            {label}
          </Form.Label>
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