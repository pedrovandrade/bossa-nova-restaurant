import { FC } from 'react';
import I18nRichTextProcessor, { RichTextParams } from '@/components/I18nRichTextProcessor';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/app/lib/pageMetadata';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return createPageMetadata({
    locale,
    path: '/privacy-policy',
    title: t('privacyPolicy.title'),
    description: t('privacyPolicy.description'),
  });
}

const PrivacyPolicyPage: FC = () => {
  const locale = useLocale();
  const messages = useMessages();
  const paragraphMap = messages.pages.privacyPolicy as {[key: string]: string};

  const paragraphKeys: string[] = Object.keys(paragraphMap);
  const t = useTranslations('pages.privacyPolicy');

  const params: RichTextParams = {
    phoneNumber: '+33567686479',
    reservationUrl: `/${locale}/reservations`,
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