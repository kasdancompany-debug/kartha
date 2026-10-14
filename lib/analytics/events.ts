import type { CompanionId } from "@/content/companions";
import type { WorldId } from "@/content/worlds";
import type { ThemeId } from "@/content/themes";
import type { AgeBand } from "@/lib/oracle/validation";
import type { DeviceTier } from "@/lib/device/tier";

// Part I — the full event vocabulary. Phase 3 only ever fires the first
// five (landing through theme_selected); the rest are typed now so later
// phases (Weaving, Share, Commerce) slot in without reshaping this file.
export type KathaEvent =
  | { name: "story_started" }
  | { name: "hero_created"; props: { has_age: boolean; age_band?: AgeBand } }
  | { name: "companion_selected"; props: { companion: CompanionId } }
  | { name: "world_selected"; props: { world: WorldId } }
  | { name: "theme_selected"; props: { theme: ThemeId } }
  | {
      name: "story_completed";
      props: { companion: CompanionId; world: WorldId; theme: ThemeId; skipped_animation: boolean; tier: DeviceTier };
    }
  | {
      name: "cover_shared";
      props: { method: "web_share_file" | "web_share_link" | "download" | "copy" | "whatsapp"; format: "4x5" | "9x16" };
    }
  | { name: "preview_opened" }
  | { name: "checkout_started"; props: { tier: "standard" | "deluxe"; value: 199 | 499 } }
  | { name: "purchase_completed"; props: { tier: "standard" | "deluxe"; value: number; currency: "INR"; order_id: string } };
