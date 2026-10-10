import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // 1. Process internationalization
  let response = intlMiddleware(request);

  // Note: For Firebase SSR authentication, you would typically verify session cookies here
  // or handle redirecting unauthenticated users from protected routes.
  
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|bn)/:path*']
};
