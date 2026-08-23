/**
 * Internationalization (i18n) & Localized SEO Architecture.
 *
 * Designed according to Google Search Central guidelines:
 * - Prevents low-quality machine translated duplicate pages
 * - Provides structured hreflang alternate links for future multi-lingual rollout
 * - Clean locale mapping for supported languages
 */

export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  defaultLocale?: boolean;
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr", defaultLocale: true },
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", direction: "ltr" },
];

export const DEFAULT_LOCALE = "en";

/**
 * Returns hreflang link tags for SEO metadata.
 */
export function getHrefLangLinks(basePath: string, domain = "https://mypdf4u.com") {
  const cleanPath = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return [
    { rel: "alternate", hrefLang: "x-default", href: `${domain}${cleanPath}` },
    { rel: "alternate", hrefLang: "en", href: `${domain}${cleanPath}` },
  ];
}
