# Cultural review log

Every `// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED` comment in the codebase gets a row here (Part 0.3). Nothing in this list ships to real customers until a named consultant has signed off. Status starts at **Open** for everything in Phase 1.

| Area | File | What needs checking | Status |
|---|---|---|---|
| World: Banyan Forest | [content/worlds/banyan.ts](../content/worlds/banyan.ts) | Banyan trees carry sacred associations in some communities (village deities, tied threads). Confirm the art stays a tree with no shrine/thread iconography. | Open |
| World: Himalayan Kingdom | [content/worlds/himalaya.ts](../content/worlds/himalaya.ts) | Avoid monasteries, prayer flags, stupas (religious). Confirm terraced-field/slate-roof/deodar vocabulary reads as secular. | Open |
| World: Lost Stepwell | [content/worlds/stepwell.ts](../content/worlds/stepwell.ts) | Stepwells often carry shrine niches. Confirm niches stay empty or geometric/floral only, no deity figures. | Open |
| World: Monsoon City | [content/worlds/monsoon.ts](../content/worlds/monsoon.ts) | Needs one specific real city lineage chosen with the consultant; confirm it avoids poverty/chaos clichés. | Open |
| World: Star Observatory | [content/worlds/observatory.ts](../content/worlds/observatory.ts) | Verify stone astronomical instrument depictions against real Jantar Mantar instruments; confirm no astrology/zodiac framing. | Open |
| World: Secret Jungle | [content/worlds/jungle.ts](../content/worlds/jungle.ts) | Much Mithila (Madhubani) art is ritual-based. Confirm all deity/ritual motifs are excluded. | Open |
| Companion: Tiger | [content/companions.ts](../content/companions.ts) | White tigers are captive-bred, not a wild population or natural colour morph. Decide whether the rare "White" epithet should ship at all. | Open |
| Companion: Elephant | [content/companions.ts](../content/companions.ts) | Confirm the rig/pose reads as a neutral elephant, with no resemblance to Ganesha (no pose, ornaments, or single-tusk detail). | Open |
| Companion: Monkey | [content/companions.ts](../content/companions.ts) | Confirm the rig reads as a langur/macaque with no resemblance to Hanuman (no mace, crown, or flying pose). | Open |
| Companion: Cobra | [content/companions.ts](../content/companions.ts) | Snakes carry religious meaning (Nag). Confirm the portrayal reads as a wise guardian, never a deity, never threatening to children. | Open |
| Companion: Peacock | [content/companions.ts](../content/companions.ts) | National bird; confirm the portrayal stays respectful and carries no attached religious iconography. | Open |
| Music/sound motif | Part E.1 of the build guide | The Weaving's plucked-string motif (e.g. santoor or sarangi) needs a credited composer/consultant, not a generic stock loop. | Open (not yet built — Phase 5) |

Process going forward: when a new `// INDIAN CULTURAL CONSULTANT REVIEW REQUIRED` comment is added anywhere in the codebase, add a row here in the same commit. A row only moves to **Reviewed** once a named consultant has signed off in writing, recorded in this file (name, date, note).
