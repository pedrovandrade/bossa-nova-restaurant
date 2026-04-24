'use client';

import { MarketingData } from '@/types/MarketingData';
import { FC, useCallback, useState } from 'react';
import InstagramFeedEditor from './InstagramFeedEditor';
import PopinEditor from './PopinEditor';
import { useRouter } from '@/i18n/navigation';
import DashboardForm from '@/components/DashboardForm';

type MarketingEditionFormProps = {
  data: MarketingData;
};

const MarketingEditionForm: FC<MarketingEditionFormProps> = ({ data }) => {
  const router = useRouter();
  
  const [marketingData, setMarketingData] = useState<MarketingData>(data);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [parsedInstagramUrl, setParsedInstagramUrl] = useState<string | null>(data.instagram.url);
  const [errorsMap, setErrorsMap] = useState({url: false, popinImage: false, popinAltText: false});

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
    let fileUrl = marketingData.popin.image;

    // Delete the current image if it exists
    if (marketingData.popin.image !== '' && imageFile) {
      const deleteImageResponse = await fetch('/api/marketing/popin/image', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: marketingData.popin.image }),
      });

      if (!deleteImageResponse.ok) {
        const txt = await deleteImageResponse.text();
        throw new Error(txt || 'Failed to delete previous marketing popin image.');
      }
      fileUrl = ''; // Erase the previous URL
    }

    // Upload new image
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const uploadImageResponse = await fetch('/api/marketing/popin/image', {
        method: 'POST',
        body: formData,
      });

      if (!uploadImageResponse.ok) {
        const txt = await uploadImageResponse.text();
        throw new Error(txt || 'Failed to upload new marketing popin image.');
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
  }

  const cancelChanges = () => {
    router.push('/dashboard');
  };

  return (
    <DashboardForm
      onSubmit={handleSaveChanges}
      onCancel={cancelChanges}
      hasErrors={hasErrors()}
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
    </DashboardForm>
  );
};

export default MarketingEditionForm;
