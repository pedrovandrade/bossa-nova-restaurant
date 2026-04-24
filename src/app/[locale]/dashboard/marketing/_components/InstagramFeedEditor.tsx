import { UpdateIcon } from '@/app/_components/_icons';
import LinkIcon from '@/components/_icons/Link';
import InstagramFeed from '@/components/InstagramFeed/InstagramFeed';
import { FC, MouseEventHandler, useId, useState } from 'react';
import { Switch } from '@ark-ui/react';
import { useTranslations } from 'next-intl';

type InstagramFeedEditorProps = {
  isActive: boolean;
  onActiveStateChange: (active: boolean) => void;
  onUrlChange?: (url: string, parsedUrl: string | null) => void;
  url: string;
};

const InstagramFeedEditor: FC<InstagramFeedEditorProps> = ({ isActive, onActiveStateChange, url, onUrlChange }) => {
  const inputId = useId();
  const t = useTranslations('pages.dashboard.pages.marketing.editionForm.instagramFeedEditor');

  const [publicationPreviewUrl, setPublicationPreviewUrl] = useState(url);
  const [urlError, setUrlError] = useState('');

  /**
   * Validate and canonicalize Instagram post URL by:
   * - checking the https://www.instagram.com origin
   * - requiring a `/p/{code}` path segment
   * @param raw The non-processed input URL string.
   */
  const checkInstagramUrl = (rawUrl: string): string | null => {
    let url: URL;
    try {
      url = new URL(rawUrl);
    } catch {
      setUrlError(t('errors.invalidUrl'));
      return null;
    }

    if (url.protocol !== 'https:' || url.hostname !== 'www.instagram.com') {
      setUrlError(t('errors.badOrigin'));
      return null;
    }

    // Find the first occurrence of /p/{code} in the path and extract the code.
    // This allows inputs like /username/p/{code}/... to be transformed to /p/{code}/
    const match = url.pathname.match(/(?<=^(\/[^\/]+){0,1}\/p\/)([^\/\?#]+)/);
    if (!match) {
      setUrlError(t('errors.notAPost'));
      return null;
    }

    // Clear previous error if validation passed.
    setUrlError('');

    const postPath = match[0];
    // Return canonical form without query or hash and without trailing slash.
    return `https://www.instagram.com/p/${postPath}`;
  }

  const handleUrlChange = (newUrl: string) => {
    const parsedUrl = checkInstagramUrl(newUrl);
    onUrlChange?.(newUrl, parsedUrl);
  }

  const handleSeeUrlPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const parsedUrl = checkInstagramUrl(url);
    if (parsedUrl) {
      setPublicationPreviewUrl(parsedUrl);
      onUrlChange?.(parsedUrl, parsedUrl);
    }
  };

  return (
    <section className='w-full h-full flex flex-col items-center justify-center gap-6'>
      <h2 className='text-2xl font-bold mt-10'>{t('title')}</h2>

      {/* Toggle switch for activation */}
      <Switch.Root
        checked={isActive}
        onCheckedChange={(details) => onActiveStateChange(details.checked)}
        disabled={false}
        aria-label={isActive ? t('switch.enabledAriaLabel') : t('switch.disabledAriaLabel')}
        aria-checked={isActive}
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

      <div className='w-full max-w-2xl px-5'>
        <div
          className={[
            'w-full',
            'gap-6',
            'flex',
            'flex-col',
            'md:flex-row',
            'items-center',
            'justify-center',
            isActive && Boolean(urlError) ? 'mb-0' : 'mb-6',
          ].join(' ')}
        >

          {/* Input field for Instagram Post URL */}
          <div className={[
              'flex',
              'grow',
              'w-full',
              'md:w-auto',
              'items-center',
              'max-w-2xl',
              'rounded-lg',
              'border',
              'px-3',
              isActive && Boolean(urlError) ? 'border-red-500' : 'border-slate-400',
              isActive ? 'bg-white' : 'bg-slate-100',
              !isActive && 'opacity-50',
            ].join(' ')}
          >
            <div className='pr-2 mr-3 text-gray-500'>
              <LinkIcon />
            </div>
            <div className='relative w-full'>
              <input
                id={inputId}
                autoComplete='url'
                placeholder=' '
                required={true}
                disabled={!isActive}
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
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
                htmlFor={inputId}
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
                {t('inputLabel')}
              </label>
            </div>
          </div>

          {/* Preview button */}
          <button
            type='button'
            onClick={handleSeeUrlPreview}
            disabled={!isActive || Boolean(urlError)}
            className={[
              'text-white',
              'px-6',
              'py-2',
              'rounded-md',
              'hover:cursor-pointer',
              'hover:bg-bossanova-green',
              'focus:ring-2',
              'focus:ring-bossanova-cyan',
              'focus:ring-opacity-50',
              'flex',
              'justify-center',
              'items-center',
              'w-full',
              'md:w-auto',
              'h-11',
              'bg-bossanova-cyan',
              'disabled:bg-slate-400',
              'disabled:cursor-not-allowed',
            ].join(' ')}
          >
            <span className='mr-2'><UpdateIcon /></span>
            {t('previewButtonLabel')}
          </button>
        </div>

        {/* Error messages */}
        {urlError && isActive && (
          <p className='text-red-500 w-full text-base'>
            {urlError}
          </p>
        )}

      </div>

      {/* Instagram Feed Preview */}
      <div className={[
          'w-full',
          'h-full',
          'flex',
          'items-center',
          'justify-center',
          !isActive && 'opacity-50',
          !isActive && 'pointer-events-none',
        ].join(' ')}
      >
        <InstagramFeed url={publicationPreviewUrl} />
      </div>

    </section>
  );
};

export default InstagramFeedEditor;