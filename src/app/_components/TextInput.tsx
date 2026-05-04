import { ChangeEventHandler, FC, HTMLInputAutoCompleteAttribute, ReactElement } from 'react';

type TextInputProps = {
  id?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  isActive?: boolean;
  label: string;
  icon?: ReactElement;
  error?: string;
};

const TextInput: FC<TextInputProps> = (props) => {
  const {
    id,
    autoComplete,
    onChange,
    value,
    defaultValue,
    required = false,
    isActive = true,
    label,
    icon,
    error,
  } = props;
  return (
    <div className='w-full'>
      <div className={[
          'flex',
          'grow',
          'md:w-auto',
          'max-w-2xl',
          'items-center',
          'rounded-lg',
          'border',
          'px-3',
          isActive && Boolean(error) ? 'border-red-500' : 'border-slate-400',
          isActive ? 'bg-white' : 'bg-slate-100',
          !isActive && 'opacity-50',
          isActive && Boolean(error) ? 'mb-0' : 'mb-6',
        ].join(' ')}
      >
        { icon &&
          <div className='pr-2 mr-3 text-gray-500'>
            {icon}
          </div>
        }
        <div className='relative w-full'>
          <input
            id={id}
            type='text'
            autoComplete={autoComplete}
            placeholder=' '
            required={required}
            disabled={!isActive}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={[
              'peer',
              'w-full',
              'pt-8',
              'pb-3',
              'outline-none',
              'text-2xl',
              'disabled:cursor-not-allowed'
            ].join(' ')}
          />
          <label
            htmlFor={id}
            className={[
              'pointer-events-none',
              'absolute',
              'left-0',
              'top-1/2',
              '-translate-y-1/2',
              'text-2xl',
              'text-gray-700',
              'font-semibold',
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
          </label>
        </div>
      </div>

      {/* Error message */}
      {error && isActive && (
        <p className='text-red-500 w-full text-base'>
          {error}
        </p>
      )}
    </div>
  );
};
export default TextInput;