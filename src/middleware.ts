import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin-token');
  const { pathname } = request.nextUrl;

  // Allow access to the login page without token
  if (pathname === '/admin') {
    // If user has token and tries to access login page, redirect to dashboard
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    // If no token, allow access to login page
    return NextResponse.next();
  }

  // For all other admin routes, require token
  if (pathname.startsWith('/admin/') && !adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};