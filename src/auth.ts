import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { verifyUserCredentials } from '@/app/api/auth/_repository';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // verifyUserCredentials already runs zod validation and bcrypt compare
        const user = await verifyUserCredentials(credentials);
        if (!user) return null;
        // return object stored in JWT
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
});