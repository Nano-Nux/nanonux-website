export const runtime = 'edge';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Skip API, _next, static files, and localized paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/logo') ||
    pathname.startsWith('/en') ||
    pathname.startsWith('/mm')
  ) {
    return NextResponse.next();
  }

  // If path is root or not localized, determine locale
  if (pathname === '/' || !pathname.match(/^\/[a-z]{2}(\/|$)/)) {
    // Prefer Geo IP when available via common edge headers
    // Use 'MM' country code for Myanmar
    const countryHeader = (req.headers.get('x-vercel-ip-country') || req.headers.get('x-edge-country') || req.headers.get('x-nf-country') || '') as string;
    const country = countryHeader || undefined;

    // Fallback to Accept-Language header
    const acceptLang = (req.headers.get('accept-language') || '').toLowerCase();

    const prefersMyanmar = (country && country.toUpperCase() === 'MM') || acceptLang.startsWith('my');

    url.pathname = prefersMyanmar ? '/mm' : '/en';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next|static|favicon|logo).*)'],
};
