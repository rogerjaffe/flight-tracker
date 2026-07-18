import { appStore } from "../store.ts";
import type { DisplayContent } from "../types/AppState.ts";

export const nextDisplayMode = (): DisplayContent => {
  if (appStore.displayContent.value === "flight") {
    return "map";
  } else if (appStore.displayContent.value === "map") {
    return "distance";
  } else {
    return "flight";
  }
};
