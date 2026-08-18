import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

function pruneRateLimitMap(now: number) {
  if (rateLimitMap.size > 1000) {
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) rateLimitMap.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneRateLimitMap(now);

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

function isTestingEnv() {
  const env = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;

  return (
    env !== "production" ||
    vercelEnv === "preview" ||
    vercelEnv === "development"
  );
}

export function middleware(request: NextRequest) {
  const ip =
    request.ip ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/results") ||
    pathname.startsWith("/api/dispatch-directives")
  ) {
    if (isRateLimited(ip)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  const testing = isTestingEnv();

  const imgSrc = testing
    ? "img-src 'self' blob: data: https://vercel.live https://vercel.com;"
    : "img-src 'self' blob: data:;";

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://vercel.live;
    style-src 'self' 'unsafe-inline';
    ${imgSrc}
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live;
    frame-src 'self' https://vercel.live;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const authCookie = request.cookies.get("sb-access-token");
  if (pathname.startsWith("/admin") && !authCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.search = request.nextUrl.search;
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
