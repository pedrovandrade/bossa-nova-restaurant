'use client';

import { MarketingData } from '@/types/MarketingData';
import { FC, useCallback, useState } from 'react';
import InstagramFeedEditor from './InstagramFeedEditor';
import PopinEditor from './PopinEditor';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

type MarketingEditionFormProps = {
  data: MarketingData;
};

const MarketingEditionForm: FC<MarketingEditionFormProps> = ({ data }) => {
  const router = useRouter();
  const t = useTranslations('pages.dashboard.pages.marketing.editionForm');
  
  const [marketingData, setMarketingData] = useState<MarketingData>(data);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [parsedInstagramUrl, setParsedInstagramUrl] = useState<string | null>(data.instagram.url);
  const [errorsMap, setErrorsMap] = useState({url: false, popinImage: false, popinAltText: false});
  const [saving, setSaving] = useState(false);

  const hasErrors = useCallback(() => {
    return Object.values(errorsMap).some(hasError => hasError);
  }, [errorsMap]);

  /** ********** Handlers for the user data change ********** */

  /**
   * Handles the change of the Instagram feed active state.
   * @param active the new active state of the Instagram feed, used to
   * update the marketingData state.
   */
  const handleInstagramActiveChange = (active: boolean) => {
    setMarketingData(prev => ({
      ...prev,
      instagram: {
        ...prev.instagram,
        active
      }
    }));
  };

  /**
   * Handles the change of the Instagram feed URL.
   * @param url the new URL of the Instagram feed, used to update the marketingData state.
   */
  const handleInstagramUrlChange = (url: string, parsedUrl: string | null) => {
    setParsedInstagramUrl(parsedUrl);
    setMarketingData(prev => ({
      ...prev,
      instagram: {
        ...prev.instagram,
        url
      }
    }));
  };

  /**
   * Handles the change of the popin active state.
   * @param active the new active state of the popin, used to update the marketingData state.
   */
  const handlePopinActiveChange = (active: boolean) => {
    setMarketingData(prev => ({
      ...prev,
      popin: {
        ...prev.popin,
        active
      }
    }));
  };

  /**
   * Handles the change of the popin image file.
   * @param image the new popin's image file.
   * @param hasError optional flag indicating if there was an error with the file upload.
   */
  const handlePopinImageChange = (image: File | null, hasError?: boolean) => {
    setErrorsMap(prev => ({ ...prev, popinImage: hasError || false }));
    setImageFile(image);
  };

  /**
   * Handles the change of the popin alt text.
   * @param altText the new alt text of the popin, used to update the marketingData state.
   * @param hasError optional flag indicating if there was an error with the alt text.
   */
  const handlePopinAltTextChange = (altText: Record<string, string>, hasError?: boolean) => {
    setErrorsMap(prev => ({ ...prev, popinAltText: hasError || false }));
    setMarketingData(prev => ({
      ...prev,
      popin: {
        ...prev.popin,
        altText
      }
    }));
  };

  /**
   * Persist marketing changes:
   * - If popin image changed and new image is empty => request backend to delete previous image.
   * - If popin image changed and new image is provided, include it in payload (assumes PopinEditor provides either a data-URL or filename).
   * - Use parsedInstagramUrl (if present) as instagram.url in payload.
   *
   * @returns Promise<void>
   */
  async function handleSaveChanges(): Promise<void> {
    if (hasErrors()) return;
    setSaving(true);
    try {
      // Delete the current image if it exists
      if (marketingData.popin.image !== '' && imageFile) {
        const deleteImageResponse = await fetch('/api/marketing/popin/image', {
          method: 'DELETE',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ url: marketingData.popin.image }),
        });

        if (!deleteImageResponse.ok) {
          const txt = await deleteImageResponse.text();
          throw new Error(txt || 'Failed to save marketing data');
        }
      }

      // Upload new image
      let fileUrl = marketingData.popin.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadImageResponse = await fetch('/api/marketing/popin/image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadImageResponse.ok) {
          const txt = await uploadImageResponse.text();
          throw new Error(txt || 'Failed to save marketing data');
        }

        const uploadResult = await uploadImageResponse.json();
        fileUrl = uploadResult.url;
      }

      const payload: MarketingData = {
        popin: {
          ...(marketingData.popin ?? {}),
          image: fileUrl,
          altText: marketingData.popin.altText,
        },
        instagram: {
          ...(marketingData.instagram ?? {}),
          url: parsedInstagramUrl ?? marketingData.instagram.url,
        },
      };

      const res = await fetch('/api/marketing', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to save marketing data');
      }

      // On success, navigate back to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      // mark popin error if response indicated image problems, otherwise mark url error generically
      setErrorsMap(prev => ({ ...prev, popinImage: true }));
    } finally {
      setSaving(false);
    }
  }

  const cancelChanges = () => {
    router.push('/dashboard');
  };

  return (
    <div
      className='text-bossanova-cyan flex flex-col gap-7 w-full max-w-5xl mb-5 mx-auto'
    >
      <div>
        <InstagramFeedEditor
          isActive={marketingData.instagram.active}
          onActiveStateChange={handleInstagramActiveChange}
          url={marketingData.instagram.url}
          onUrlChange={handleInstagramUrlChange}
        />
        <div aria-hidden={true} className='w-full border-b border-slate-400 my-8'></div>
        <PopinEditor
          isActive={marketingData.popin.active}
          onActiveStateChange={handlePopinActiveChange}
          image={marketingData.popin.image}
          onImageChange={handlePopinImageChange}
          altText={marketingData.popin.altText}
          onAltTextChange={handlePopinAltTextChange}
        />
      </div>
      <div className='sticky bg-white bottom-0 w-full h-20 px-10 shadow-[0_-5px_10px_rgba(0,0,0,0.25)]'>
        <div className='flex gap-15 absolute right-10 top-1/2 -translate-y-1/2'>
          <button
            type='submit'
            className={[
              'bg-bossanova-cyan',
              'text-white',
              'px-6',
              'py-2',
              'rounded-md',
              'hover:cursor-pointer',
              'hover:bg-bossanova-green',
              'focus:ring-2',
              'focus:ring-bossanova-cyan',
              'focus:ring-opacity-50',
              'disabled:opacity-50',
              'disabled:hover:cursor-not-allowed',
              'disabled:hover:bg-bossanova-cyan'
            ].join(' ')}
            disabled={hasErrors() || saving}
            onClick={handleSaveChanges}
          >
            {saving ? 'Saving...' : t('saveChanges')}
          </button>
          <button
            className={[
              'bg-bossanova-cyan',
              'text-white',
              'px-6',
              'py-2',
              'rounded-md',
              'hover:cursor-pointer',
              'hover:bg-bossanova-green',
              'focus:ring-2',
              'focus:ring-bossanova-cyan',
              'focus:ring-opacity-50'
            ].join(' ')}
            onClick={cancelChanges}
          >
            {t('discardChanges')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingEditionForm;
