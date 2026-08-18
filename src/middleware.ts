import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function makeNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function middleware(request: NextRequest) {
  const nonce = makeNonce();

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.supabase.co;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  // Auth & Navigation Guard (preserves query strings like ?session_id=)
  const authCookie = request.cookies.get("sb-access-token");
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/admin") && !authCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.search = url.search; // Preserve query parameters across redirects
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
