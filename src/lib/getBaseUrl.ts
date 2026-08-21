/**
 * Canonical Server & Client Absolute Base URL Resolver
 * Guarantees a fully qualified protocol + host string for Node.js fetch execution.
 */
export function getBaseUrl(): string {
  // 1. Explicitly configured public application URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (appUrl) {
    const clean = appUrl.replace(/\/+$/, "");
    return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
  }

  // 2. Vercel System Deployment Variables (Server/Edge Runtimes)
  const vercelProjectProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProjectProd) {
    const clean = vercelProjectProd.replace(/\/+$/, "");
    return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const clean = vercelUrl.replace(/\/+$/, "");
    return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
  }

  // 3. Strict Production Fail-Fast Guard
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "CRITICAL_ENV_MISSING: Cannot resolve absolute URL for server-side fetch. " +
      "Set NEXT_PUBLIC_APP_URL, VERCEL_PROJECT_PRODUCTION_URL, or ensure VERCEL_URL is exposed in Vercel settings."
    );
  }

  // 4. Local Development Fallback
  const port = process.env.PORT || "3000";
  return `http://localhost:${port}`;
}
