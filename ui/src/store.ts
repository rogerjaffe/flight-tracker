import { signal } from "@preact/signals";
import type { DashboardState } from "./types/DashboardState";
import type { AppState } from "./types/AppState.ts";

// DASHBOARD STATE SLICE (Driven entirely by the background Web Worker)
export const dashboardStore: DashboardState = {
  flightList: signal([]),
  flightInfo: signal(null),
  realTime: signal(null),
  config: signal(null),
};

// APPLICATION STATE SLICE (Contained locally inside the UI app)
export const appStore: AppState = {
  isLoading: signal(true),
  displayContent: signal("flight"),
  displayRotate: signal(false),
  displayRotateInterval: signal(30),
  darkmode: signal(false),
  darkmodeOverride: signal(false),
  config: signal(null),
  worker: signal<Worker | null>(null),
  errorMessage: signal(null),
};
