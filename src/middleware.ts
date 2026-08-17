import { NextRequest, NextResponse } from "next/server";
import { strictApiLimiter } from "@/lib/ratelimit";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only rate-limit writes
  if (req.method !== "POST") return NextResponse.next();

  // Local dev fallback if Redis env vars are missing
  if (!strictApiLimiter) return NextResponse.next();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "127.0.0.1";

  // Template literal properly escaped with backticks
  const identifier = `ratelimit_${pathname}_${ip}`;

  const { success, limit, remaining, reset } =
    await strictApiLimiter.limit(identifier);

  if (!success) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please retry in a few seconds.",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/dispatch-directives", "/api/save-operator-response"],
};
