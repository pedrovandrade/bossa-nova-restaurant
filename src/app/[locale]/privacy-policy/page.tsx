import { FC } from 'react';
import I18nRichTextProcessor, { RichTextParams } from '@/components/I18nRichTextProcessor';
import { useMessages, useTranslations } from 'next-intl';

const PrivacyPolicyPage: FC = () => {
  const messages = useMessages();
  const paragraphMap = messages.pages.privacyPolicy as {[key: string]: string};

  const paragraphKeys: string[] = Object.keys(paragraphMap);
  const t = useTranslations('pages.privacyPolicy');

  const params: RichTextParams = {
    phoneNumber: '+33567686479',
    reservationUrl: 'https://www.bossa-nova-restaurant.fr/reservation',
  };

  return (
    <section className='min-h-screen p-8 mx-auto max-w-7xl font-[heebo]'>
      {paragraphKeys.map((paragraphKey) => (
        <I18nRichTextProcessor
          key={paragraphKey}
          params={params}
          tagClassNames={{
            h1: 'mb-6 text-2xl font-semibold',
            h2: 'mb-5 mt-10 text-2xl font-medium',
            ul: 'mb-6 text-base',
            li: 'mb-2',
            strong: 'text-slate-900',
            p: 'mb-4 text-base'
          }}
        >
          {(tags) => t.rich(paragraphKey, tags)}
        </I18nRichTextProcessor>
      ))}
    </section>
  );
};

export default PrivacyPolicyPage;