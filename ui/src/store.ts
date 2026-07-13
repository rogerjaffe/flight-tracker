import { signal } from "@preact/signals";
import type { DashboardState } from "./types/DashboardState";
import type { AppState } from "./types/AppState.ts";

// DASHBOARD STATE SLICE (Driven entirely by the background Web Worker)
export const dashboardStore: DashboardState = {
  flightList: signal([]),
  // flightToDisplay: signal(null),
  flightInfo: signal(null),
  realTime: signal(null),
  config: signal(null),
  // slowSummary: signal(0),
  // lastUpdated: signal(null),
};

// APPLICATION STATE SLICE (Contained locally inside the UI app)
export const appStore: AppState = {
  isLoading: signal(true),
  displayContent: signal("flight"),
  displayRotate: signal(false),
  displayRotateInterval: signal(30),
  darkmode: signal(false),
  config: signal(null),
  worker: signal<Worker | null>(null), // fastFeed: signal([]),
  // isMenuOpen: signal(false),
  // activeTab: signal("feed"),
  // theme: signal("light"),
  // isLoading: signal(true),
  errorMessage: signal(null),
};

// export function resetDashboardStore(): void {
//   dashboardStore.fastFeed.value = [];
//   dashboardStore.slowSummary.value = 0;
//   dashboardStore.lastUpdated.value = null;
//   dashboardStore.config.value = null;
// }
