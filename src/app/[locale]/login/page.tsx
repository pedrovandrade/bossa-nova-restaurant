import type { FC } from 'react';
import LoginForm from '@/pages/login/_components/LoginForm';
import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const LoginPage: FC = () => {
  const currentLocale = useLocale();

  // Server Action: receives FormData from the client form, performs auth work,
  // sets a cookie and redirects on success.
  async function loginAction(formData: FormData) {
    'use server';

    const email = (formData.get('email') ?? '').toString();
    const password = (formData.get('password') ?? '').toString();

    // Basic validation (replace with real auth logic)
    if (!email || !password) {
      // Redirect back with error query (simple UX handling)
      redirect({ href: '/login?error=invalid_credentials', locale: currentLocale });
    }

    // TODO: replace with real authentication (DB lookup / external service)
    const authenticated = email === 'admin@example.com' && password === 'password';

    if (!authenticated) {
      redirect({ href: '/login?error=invalid_credentials', locale: currentLocale });
    }

    // Set a simple session cookie (example). Replace with secure session/token logic.
    try {
      const requestCookies = await cookies();
      requestCookies.set({
        name: 'session',
        value: Buffer.from(`${email}:${Date.now()}`).toString('base64'),
        httpOnly: true,
        path: '/',
      });
    } catch (err) {
      // if setting cookie fails, still redirect (or handle as you prefer)
      console.error('Failed to set cookie in server action', err);
    }

    // Redirect to home (or dashboard) after successful login
    redirect({ href: '/dashboard', locale: currentLocale });
  }

  // Render the client form and pass the server action as the form action prop
  return <LoginForm action={loginAction} />;
};

export default LoginPage;