import { NextRequest, type NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

type EndpointFunction = (req: Request) => Response | NextResponse | Promise<Response> | Promise<NextResponse>;

/**
 * Decorator for API route handlers that requires an authenticated user with role "owner".
 *
 * Usage:
 * ```ts
 * const POST = requireOwner(async (req: NextRequest) => { ... });
 * ```
 *
 * Behavior:
 * - Verifies JWT/session token using next-auth's getToken and the secret from AUTH_SECRET.
 * - If no valid token is present, returns 401 with { error: 'Authentication required' }.
 * - Otherwise calls the wrapped handler and returns its Response.
 *
 * Notes:
 * - The wrapped handler receives the same arguments forwarded from the route (typically a NextRequest).
 * - The decorator returns a function compatible with Next.js App Router route handlers.
 *
 * @param handler The original route handler to protect.
 * @returns A new route handler that enforces authentication + owner role before invoking the original handler.
 */
export function requireOwner(handler: EndpointFunction): EndpointFunction {
  return async (req): Promise<Response> => {
    const secret = process.env.AUTH_SECRET || '';
    const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || '');
    const secureCookie = baseUrl.protocol === 'https';

    // Ensure getToken can read cookies correctly
    const nextReq = req instanceof NextRequest
      ? req
      : new NextRequest(req);

    // Temporary debug — remove after diagnosis
    console.log('[requireOwner] secureCookie:', secureCookie);
    console.log('[requireOwner] secret set:', !!secret);
    console.log('[requireOwner] cookies:', req.headers.get('cookie'));

    const token = await getToken({
      req: nextReq,
      secureCookie,
      secret,
      cookieName: secureCookie
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token',
    });

    console.log('[requireOwner] token:', token);

    if (!token) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    // authorized — forward to original handler
    const result = await handler(req);
    return result;
  };
}
