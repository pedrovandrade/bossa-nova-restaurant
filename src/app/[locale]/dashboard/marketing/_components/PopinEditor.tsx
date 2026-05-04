import { CurrentLocale, LocalizedText } from '@/types/LocalizedText';
import { FileUpload, Switch } from '@ark-ui/react/';
import { FC, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { AlertCircleIcon, Cross, PaperClip } from '@/components/_icons';
import TextInput from '@/app/_components/TextInput';

type PopinEditorProps = {
  isActive: boolean;
  onActiveStateChange: (active: boolean) => void;
  image?: string;
  onImageChange?: (image: File | null, hasError?: boolean) => void;
  altText?: LocalizedText;
  onAltTextChange?: (altText: LocalizedText, hasError?: boolean) => void;
};

const errorMessages: Partial<Record<string, string>> = {
  'TOO_MANY_FILES': 'tooManyFiles',
  'FILE_INVALID_TYPE': 'fileInvalidType',
  'FILE_TOO_LARGE': 'fileTooLarge',
  'FILE_TOO_SMALL': 'fileTooSmall',
  'FILE_INVALID': 'fileInvalid',
  'FILE_EXISTS': 'fileExists',
};

const PopinEditor: FC<PopinEditorProps> = ({
  isActive,
  onActiveStateChange,
  image,
  onImageChange,
  altText,
  onAltTextChange,
}) => {
  const [descriptionEmpty, setDescriptionEmpty] = useState({fr: false, en: false, pt: false});
  const [imagePreviewUrl, setImagePreviewUrl] = useState(image);

  const t = useTranslations('pages.dashboard.pages.marketing.editionForm.popinEditor');
  const currentLocale: CurrentLocale = useLocale() as CurrentLocale;
  const { locales } = routing;
  const languageNames: Record<CurrentLocale, string> = {
    en: 'English',
    fr: 'Français',
    pt: 'Português',
  };

  /**
   * Handles the change of the popin image file.
   * @param details the details of the file change event, containing the accepted and rejected files.
   */
  const handleFileChange = (details: FileUpload.FileChangeDetails) => {
    const { acceptedFiles, rejectedFiles } = details;

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreviewUrl(reader.result as string);
          onImageChange?.(file);
        }
      };
      reader.readAsDataURL(file);
    } else {
      const hasError = rejectedFiles.length > 0;
      onImageChange?.(null, hasError);
    }
  };

  /**
   * Handles the change of the description for a specific locale.
   * @param locale the locale for which the description is being changed.
   * @param value the new description value.
   */
  const handleDescriptionChange = (locale: CurrentLocale, value: string) => {
    const newAltText = { ...altText, [locale]: value } as LocalizedText;
    const hasError = Object.values(newAltText).some((text) => !text || text.trim() === '');
    setDescriptionEmpty(prev => ({ ...prev, [locale]: !value || value.trim() === '' }));
    onAltTextChange?.(newAltText, hasError);
  };

  return (
    <section className='w-full h-full flex flex-col items-center justify-center gap-6'>
      <h2 className='text-2xl font-bold mt-10'>{t('title')}</h2>

      {/* Toggle switch for activation */}
      <Switch.Root
        checked={isActive}
        onCheckedChange={(details) => onActiveStateChange(details.checked)}
        disabled={false}
        aria-label={isActive ? t('switch.enabledAriaLabel') : t('switch.disabledAriaLabel') }
        className='inline-flex gap-3 items-center'
      >
        <Switch.Control
          className={[
            'hover:cursor-pointer',
            'h-6',
            'w-11',
            'rounded-full',
            'inline-flex',
            'transition-colors',
            'focus:outline-none',
            isActive ? 'bg-bossanova-green' : 'bg-slate-400'
          ].join(' ')}
        >
          <Switch.Thumb className={[
            'block',
            'block',
            'h-4',
            'w-4',
            'bg-white',
            'rounded-full',
            'transform',
            'transition-transform',
            'mt-1',
            isActive ? 'translate-x-6' : 'translate-x-1',
          ].join(' ')} />
        </Switch.Control>
        <Switch.Label>{isActive ? t('switch.enabledLabel') : t('switch.disabledLabel')}</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>

      {/* Popin image */}
      <div className='w-full px-5 gap-6 flex flex-col md:flex-row items-center justify-center'>
        <section className='my-4'>
          <h3 className='text-xl mb-4 font-semibold'>{t('imagePreview.title')}</h3>
            {imagePreviewUrl
              ? (
                <Image
                  src={imagePreviewUrl || ''}
                  alt={altText?.[currentLocale] || ''}
                  width={500}
                  height={300}
                  className={[
                    'object-cover',
                    'rounded-lg',
                    'h-auto',
                    !isActive && 'opacity-50',
                  ].join(' ')}
                />
              ) : (
                <div className='text-gray-500'>
                  {t('imagePreview.noImageUploaded')}
                </div>
            )}
          </section>
        <FileUpload.Root
          className='w-full md:w-auto'
          accept='image/*'
          maxFiles={1}
          onFileChange={handleFileChange}
        >
          <FileUpload.Trigger
          disabled={!isActive}
            className={[
              'mt-4',
              'px-4',
              'py-2',
              'w-full',
              'md:w-auto',
              'flex',
              'items-center',
              'justify-center',
              'gap-2',
              'bg-bossanova-cyan',
              'hover:bg-bossanova-green',
              'text-white',
              'rounded-md',
              'focus:ring-2',
              'focus:ring-bossanova-cyan',
              'focus:ring-opacity-50',
              'hover:cursor-pointer',
              'disabled:bg-slate-400',
              'disabled:cursor-not-allowed',
            ].join(' ')}
          >
            <span className='h-6 w-6'>
              <PaperClip />
            </span>
            <span>{t('imagePreview.uploadImage')}</span>
          </FileUpload.Trigger>
            <FileUpload.Context>
              {({ acceptedFiles, rejectedFiles}) => (
                <>
                  {acceptedFiles.length > 0 &&
                    <FileUpload.ItemGroup className={isActive ? '' : 'pointer-events-none opacity-50'}>
                      {acceptedFiles.map((file) => (
                        <FileUpload.Item
                          key={file.name}
                          file={file}
                          className='flex items-center gap-4 p-2 border rounded-md'
                        >
                          <FileUpload.ItemName />
                          <FileUpload.ItemSizeText />
                          <FileUpload.ItemDeleteTrigger
                            aria-label='Remove file'
                            disabled={!isActive}
                            className={[
                              'h-6',
                              'w-6',
                              'p-1',
                              'text-white',
                              'bg-bossanova-cyan',
                              'rounded-full',
                              'flex',
                              'items-center',
                              'justify-center',
                              'hover:bg-bossanova-green',
                              'hover:cursor-pointer',
                              'disabled:bg-slate-400',
                            ].join(' ')}
                          >
                            <Cross />
                          </FileUpload.ItemDeleteTrigger>
                        </FileUpload.Item>
                      ))}
                    </FileUpload.ItemGroup>
                  }

                  {rejectedFiles.length > 0 && (
                    <FileUpload.ItemGroup className=''>
                      {rejectedFiles.map((fileRejection) => (
                        <FileUpload.Item
                          key={fileRejection.file.name}
                          file={fileRejection.file}
                          className='bg-red-400/20 border border-red-400 text-bossanova-red flex items-center gap-4 p-2 rounded-md'
                          data-rejected
                        >
                          <div className='h-6 w-6'>
                            <AlertCircleIcon />
                          </div>
                          <div>
                            <FileUpload.ItemName className='text-bossanova-cyan' />
                            <FileUpload.ItemSizeText className='text-slate-500' />
                            <div className=''>
                              {fileRejection.errors.map((error) => (
                                <div key={error} className=''>
                                  {errorMessages[error] ? t(`errors.${errorMessages[error]}`) : t('errors.default')}
                                </div>
                              ))}
                            </div>
                          </div>
                        </FileUpload.Item>
                      ))}
                    </FileUpload.ItemGroup>
                  )}
                </>
              )}
            </FileUpload.Context>
          <FileUpload.HiddenInput />
        </FileUpload.Root>
      </div>

      {/* Image alt text */}
      <section className='my-4 w-full max-w-2xl px-5'>
        <h3 className='text-xl mb-4 font-semibold'>{t('imageDescriptionTitle')}</h3>
        <div className='w-full gap-3 flex flex-col items-center justify-center'>
          {locales.map((locale) => {
            const inputId = `popin-description-${locale}`;
            const hasError = descriptionEmpty[locale];

            return (
              <TextInput
                key={locale}
                id={inputId}
                required={true}
                isActive={isActive}
                value={altText?.[locale] || ''}
                onChange={(e) => handleDescriptionChange(locale, e.target.value)}
                label={languageNames[locale]}
                error={hasError ? t('errors.noEmptyDescription') : ''}
              />
            );
          })}
        </div>
      </section>

    </section>
  );
};

export default PopinEditor;