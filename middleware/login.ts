// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]; // Expecting token format: "Bearer <token>"
  const url = request.nextUrl.clone();

  // Redirect to login if not authenticated and trying to access protected route
  if (!token && url.pathname.startsWith('/pages/profile')) {
    url.pathname = '/pages/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/pages/profile'],
};
