import type { WorldId, WorldStyleKit } from "./types";
import { banyan } from "./banyan";
import { himalaya } from "./himalaya";
import { stepwell } from "./stepwell";
import { monsoon } from "./monsoon";
import { observatory } from "./observatory";
import { jungle } from "./jungle";

export * from "./types";

export const worlds: Record<WorldId, WorldStyleKit> = {
  banyan,
  himalaya,
  stepwell,
  monsoon,
  observatory,
  jungle,
};

export const worldList: WorldStyleKit[] = Object.values(worlds);
