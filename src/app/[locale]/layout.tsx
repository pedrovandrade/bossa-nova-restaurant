import type { Metadata } from 'next';
import { Open_Sans, Heebo } from 'next/font/google';
import localFont from 'next/font/local';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const heebo = Heebo({
  variable: '--font-heebo',
  subsets: ['latin'],
});

const phenomena = localFont({
  src: [
    {
      path: '../../assets/fonts/phenomena/Phenomena-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/phenomena/Phenomena-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/phenomena/Phenomena-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/phenomena/Phenomena-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/phenomena/Phenomena-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/phenomena/Phenomena-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/phenomena/Phenomena-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-phenomena',
  display: 'swap',
  preload: true,
});

const feelingPassionate = localFont({
    src: '../../assets/fonts/feeling-passionate/Feeling-Passionate.ttf',
    variable: '--font-feeling-passionate',
    display: 'swap',
    preload: true,
  });

export const metadata: Metadata = {
  title: 'Bossa Nova Restaurant',
  description: 'Le restaurant brésilien à Toulouse',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }

    return (
      <html lang={locale}>
        <body className={`${openSans.variable} ${heebo.variable} ${phenomena.variable} ${phenomena.className} ${feelingPassionate.variable} font-normal text-xl antialiased`}>
          <NextIntlClientProvider>
            <CookieConsent />
            <Header />
            <main className='flex flex-col min-h-screen row-start-2 items-center sm:items-start pt-20 overflow-clip bg-orange-50'>
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
  );
}
