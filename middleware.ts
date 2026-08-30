import { NextRequest, NextResponse } from 'next/server';

const NOT_FOUND_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

function isDisabledScannerPath(pathname: string): boolean {
  return (
    pathname === '/scan' ||
    pathname.startsWith('/scan/') ||
    pathname === '/api/scan' ||
    pathname.startsWith('/api/scan/') ||
    pathname === '/api/lead' ||
    pathname.startsWith('/api/lead/')
  );
}

export function middleware(request: NextRequest): NextResponse {
  if (!isDisabledScannerPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'not_found', message: 'Not found.' },
      { status: 404, headers: NOT_FOUND_HEADERS },
    );
  }

  return new NextResponse('Not Found', {
    status: 404,
    headers: { ...NOT_FOUND_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export const config = {
  matcher: ['/scan/:path*', '/api/scan/:path*', '/api/lead/:path*'],
};
