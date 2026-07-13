import type { LatLonList } from "./LatLon.ts";

export interface RealTimeFlightParms {
  hex: string;
  flight: string;
  alt_baro: number;
  gs: number;
  track: number;
  squawk: string;
  time: number;
  latLonList: LatLonList;
}
