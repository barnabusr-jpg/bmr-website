import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the Owner Workspace
  if (pathname.startsWith('/owner')) {
    const isAdmin = request.cookies.get('bmr_admin_token');

    if (!isAdmin) {
      // Unauthorized access attempt: Redirect to Home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/owner/:path*',
}
