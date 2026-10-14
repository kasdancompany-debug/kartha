import type { KathaEvent } from "./events";
import { consoleAdapter } from "./adapters/console";

export type { KathaEvent };

type Adapter = (event: KathaEvent) => void;

// Phase 7 adds ga4/meta-pixel/posthog here, each reading its own consent gate.
const adapters: Adapter[] = [consoleAdapter];

// Part I — "track() throws in dev if a prop named name|child|email|age
// (other than age_band) is passed." Catches an accidental PII leak at the
// call site instead of in an analytics dashboard after the fact.
const FORBIDDEN_PROP_KEYS = ["name", "child", "email", "age"];

export function track(event: KathaEvent): void {
  if (process.env.NODE_ENV !== "production" && "props" in event && event.props) {
    for (const key of Object.keys(event.props)) {
      if (FORBIDDEN_PROP_KEYS.includes(key)) {
        throw new Error(`[analytics] PII guard: refusing to track prop "${key}" on event "${event.name}"`);
      }
    }
  }
  for (const adapter of adapters) adapter(event);
}
