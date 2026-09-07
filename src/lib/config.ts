/**
 * Central site configuration for MyPDF4U.
 *
 * Used across metadata, canonical links, OpenGraph/Twitter cards,
 * structured data (JSON-LD), and sitemaps.
 */

const rawSiteUrl = (
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SITE_URL"]) ||
  "https://www.mypdf4u.com"
).replace(/\/+$/, "");

export const SITE_URL = rawSiteUrl.replace("https://mypdf4u.com", "https://www.mypdf4u.com");

export const SITE_NAME = "MyPDF4U";
export const SITE_TAGLINE = "Simple PDF tools, fast results";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" &&
    (import.meta.env?.["VITE_GA_MEASUREMENT_ID"] || import.meta.env?.["VITE_GA_TRACKING_ID"])) ||
  "G-J4NL3QX5ME";

export function getAbsoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
