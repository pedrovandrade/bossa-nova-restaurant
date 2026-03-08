import { CurrentLocale, LocalizedText } from '@/types/LocalizedText';
import { routing } from '@/i18n/routing';
import { FC, useState } from 'react';

export enum ValidationType {
  None = 0,
  NoEmptyFields = 1,
};

type LocalizedTextInputProps = {
  /** The default text for each locale. */
  localizedText: LocalizedText;
  id: string;
  bold?: boolean;
  className?: string,
  onInputChange?: (locale: CurrentLocale, value: string) => void;
  validators?: ValidationType[];
  onValidation?: (errors: ValidationType[]) => void;
};

const errorMessages: Partial<Record<ValidationType, string>> = {
  [ValidationType.NoEmptyFields]: 'Plese fill in all fields.',
};

const LocalizedTextInput: FC<LocalizedTextInputProps> = ({
  localizedText,
  id,
  bold,
  className,
  onInputChange,
  validators,
  onValidation,
}) => {
  const { locales } = routing;

  const [errors, setErrors] = useState<ValidationType[]>([]);

  const hasEmptyField = (localized: LocalizedText) => {
    return Object.values(localized).some((text) => !text || text.trim() === '');
  };

  const validate = (locale: CurrentLocale, text: string) => {
    const newErrors: ValidationType[] = [];
    const currentLocalized = { ...localizedText, [locale]: text };

    if (validators?.includes(ValidationType.NoEmptyFields) && hasEmptyField(currentLocalized)) {
      newErrors.push(ValidationType.NoEmptyFields);
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      onValidation?.(newErrors);
    }
  };

  return (
    <div>
      {locales.map((locale) => {
        const label = locale.toUpperCase();
        const inputId = `${id}-${locale}`;
        return (
          <div
            className={`flex gap-4 ${className || ''}`}
            key={locale}
          >
            <span className='font-(family-name:--font-phenomena)'>
              <label
                className='font-(family-name:--font-phenomena) font-bold text-gray-500'
                htmlFor={inputId}
              >
                {label}:
              </label>
            </span>
            <input
              id={inputId}
              type='text'
              className={[
                bold ? 'font-extrabold' : '',
                'w-full',
                'p-1',
                'rounded-md',
                'border',
                'border-gray-100',
                'focus:border-bossanova-cyan',
                'focus:ring',
                'focus:ring-bossanova-cyan',
                'focus:ring-opacity-50',
              ].join(' ')}
              defaultValue={localizedText[locale] || ''}
              onChange={(e) => {
                onInputChange?.(locale, e.target.value);
                validate(locale, e.target.value);
              }}
            />
          </div>
        );
      })}
      {/* Error messages */}
      {errors.map((error) => (
        <p key={error} className='text-red-500'>
          {errorMessages[error]}
        </p>
      ))}
    </div>
  );
};

export default LocalizedTextInput;