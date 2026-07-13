import type { Store } from "./store.ts";
import type { FlightRec } from "../types/FlightRec.ts";

const filterFcn = (staleTime: number) => (flight: FlightRec) =>
  (flight.realTime?.time ?? 0) < staleTime;

export function cleanup(store: Store) {
  const now = new Date().getTime();
  const config = store.getConfig();
  const staleTime = now - (config?.app.stale_age_seconds ?? 60) * 1000;
  const removeThese = store.filterFlights(filterFcn(staleTime));
  if (removeThese.length === 0) return;
  console.log(`Removing ${removeThese.length} stale flights`);
  removeThese.forEach((flight) => store.removeFlight(flight.hex));
}
