import { AuthError } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';

const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    await signIn(
      'credentials',
      {
        redirect: false,
        email,
        password,
      },
    );

    return new NextResponse(JSON.stringify({ email }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (error) {
    if (error instanceof AuthError) {
      let message = '';
      switch (error.type) {
        case 'CredentialsSignin':
          message = 'Invalid credentials.';
          break;
        default:
          message = 'Something went wrong.';
      }
      return new NextResponse(JSON.stringify({ error: `Authentication failed. Error: ${message}` }), { status: 500, headers: { 'content-type': 'application/json' } })
    }
    return new NextResponse(JSON.stringify({ error }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};

export { POST };