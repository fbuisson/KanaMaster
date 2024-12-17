// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname;
  // Try to read the token from cookies
  const token = req.cookies.get('accessToken')?.value;

  // Check if path starts with /admin
  if (path.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // If user is admin or the route doesn't start with /admin, continue
  return NextResponse.next();
}
