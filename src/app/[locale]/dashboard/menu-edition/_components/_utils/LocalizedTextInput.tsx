import { CurrentLocale, LocalizedText, LocalizedTextArray } from '@/types/LocalizedText';
import { routing } from '@/i18n/routing';
import { FC, useState } from 'react';
import { BrazilFlag, FranceFlag, GreatBritainFlag } from '@/components/_icons';

export enum ValidationType {
  None = 0,
  NoEmptyFields = 1,
};

type LocalizedTextInputProps = {
  /** The default text for each locale. */
  localizedText: LocalizedText;
  id: string;
  bold?: boolean;
  textCenter?: boolean;
  multiline?: boolean;
  showLabel?: boolean;
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
  textCenter,
  showLabel = true,
  multiline = false,
  className,
  onInputChange,
  validators,
  onValidation,
}) => {
  const { locales } = routing;

  const flags = {
    pt: <BrazilFlag/>,
    fr: <FranceFlag/>,
    en: <GreatBritainFlag/>,
  };

  const [errors, setErrors] = useState<ValidationType[]>([]);

  const hasEmptyField = (localized: LocalizedText | LocalizedTextArray) => {
    return Object.values(localized).some((text: string | string[]) => {
      const inputText = Array.isArray(text) ? text.join('\n'): text;
      return !inputText || inputText.trim() === ''
    });
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
        const inputId = `${id}-${locale}`;
        return (
          <div
            className={`flex gap-4 ${className || ''}`}
            key={locale}
          >
            { showLabel &&
              <div className='flex flex-col items-center justify-center'>
                <span className='block h-3 w-4'>{flags[locale]}</span>
              </div>
            }
            { multiline
              ? (
                <textarea
                  id={inputId}
                  className={[
                    bold ? 'font-extrabold' : '',
                    textCenter ? 'text-center' : '',
                    'w-full',
                    'p-1',
                    'rounded-md',
                    'border',
                    'border-gray-300',
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
              ) : (
                <input
                  id={inputId}
                  type='text'
                  className={[
                    bold ? 'font-extrabold' : '',
                    textCenter ? 'text-center' : '',
                    'w-full',
                    'p-1',
                    'rounded-md',
                    'border',
                    'border-gray-300',
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
              )
            }
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