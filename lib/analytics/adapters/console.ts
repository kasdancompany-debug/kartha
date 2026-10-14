import type { KathaEvent } from "../events";

/** Part I — the dev adapter, on now; GA4/Meta/PostHog adapters arrive in Phase 7. */
export function consoleAdapter(event: KathaEvent): void {
  if (process.env.NODE_ENV === "production") return;
  const props = "props" in event ? event.props : undefined;
  console.log(`%c[katha] ${event.name}`, "color:#6B3A2A;font-weight:bold", props ?? "");
}
