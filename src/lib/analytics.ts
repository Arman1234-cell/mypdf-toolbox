/**
 * Thin analytics seam. No provider is installed: events are buffered on
 * window so a single provider can be wired up later without touching UI code.
 */

export type AnalyticsEvent =
  | "tool_page_view"
  | "upload_started"
  | "file_selected"
  | "conversion_started"
  | "conversion_completed"
  | "conversion_failed"
  | "download_clicked";

type Payload = Record<string, string | number | boolean | undefined>;

type Sink = (event: AnalyticsEvent, payload?: Payload) => void;

declare global {
  interface Window {
    __mypdf4uAnalytics?: { event: AnalyticsEvent; payload?: Payload | undefined; at: number }[];
    mypdf4uAnalyticsSink?: Sink;
  }
}

export function track(event: AnalyticsEvent, payload?: Payload) {
  if (typeof window === "undefined") return;
  window.mypdf4uAnalyticsSink?.(event, payload);
  window.__mypdf4uAnalytics ??= [];
  window.__mypdf4uAnalytics.push({ event, payload, at: Date.now() });
  if (window.__mypdf4uAnalytics.length > 200) window.__mypdf4uAnalytics.shift();
}
