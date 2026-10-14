/**
 * Resolves the absolute canonical base URL across all environments:
 * 1. Explicit domain configured in environment (NEXT_PUBLIC_SITE_URL)
 * 2. Vercel production domain (VERCEL_PROJECT_PRODUCTION_URL)
 * 3. Vercel deployment preview domain (VERCEL_URL)
 * 4. Local development fallback (http://localhost:3000)
 *
 * Guaranteed to return a valid URL without trailing slash.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}

export const SITE_URL = getSiteUrl();
