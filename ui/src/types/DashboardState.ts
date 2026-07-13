import type { Signal } from "@preact/signals";
import type { FlightList } from "./FlightList.ts";
import type { Config } from "./Config.ts";
import { RealTime } from "./ADSB.ts";
import type { Fr24FlightDetailFlat } from "./Fr24FlightDetailFlat.ts";

export interface DashboardState {
  flightList: Signal<FlightList>;
  config: Signal<Config | null>;
  realTime: Signal<RealTime | null>;
  flightInfo: Signal<Fr24FlightDetailFlat | null>;
}
