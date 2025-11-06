import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const url = new URL((req as any).url);
  const path = url.pathname;
  const needsAuth = path.startsWith('/admin') || path.startsWith('/employee');
  if (!needsAuth) return NextResponse.next();

  const cookiesHeader = (req as any).headers.get('cookie') || '';
  const hasSession = cookiesHeader.split(';').some((c: string) => c.trim().startsWith('session_id='));
  if (hasSession) return NextResponse.next();

  const loginUrl = new URL('/login', url.origin);
  loginUrl.searchParams.set('next', path);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/employee/:path*'],
};