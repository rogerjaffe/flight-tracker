import { Signal } from "@preact/signals";
import type { Config } from "./Config.ts";

export type DisplayContent =
  "flight" | "map" | "distance" | "image" | "summary";

export interface AppState {
  isLoading: Signal<boolean>;
  displayContent: Signal<DisplayContent>;
  displayRotate: Signal<boolean>;
  displayRotateInterval: Signal<number>;
  darkmode: Signal<boolean>;
  darkmodeOverride: Signal<boolean>;
  config: Signal<Config | null>;
  worker: Signal<Worker | null>;
  errorMessage: Signal<string | null>;
}
