import type { LatLon } from "./LatLon.ts";
import type { Direction } from "./Direction.ts";

export interface ADSBResponse {
  now: number;
  messages: number;
  aircraft?: ADSBRaw[];
  ac?: ADSBRaw[];
}

export interface ADSBRaw {
  hex: string;
  flight: string;
  alt_baro: number;
  gs: number;
  track: number;
  squawk: string;
  category: string;
  lat: number;
  lon: number;
  time: number;
}

export class RealTime {
  hex: string = "";
  flight: string = "";
  alt_baro: number = 0;
  alt_baro_dir: Direction = "";
  gs: number = 0;
  gs_dir: Direction = "";
  track: number = 0;
  track_dir: Direction = "";
  squawk: string = "";
  category: string = "";
  time: number = 0;
  latLon: LatLon[] = [];

  getDirection(last: number, next: number, tolerance: number = 0) {
    if (last < next - tolerance) {
      return "inc";
    } else if (last > next + tolerance) {
      return "dec";
    } else {
      return "";
    }
  }

  update(adsbRaw: ADSBRaw) {
    this.alt_baro_dir = this.getDirection(this.alt_baro, adsbRaw.alt_baro, 0);
    this.gs_dir = this.getDirection(this.gs, adsbRaw.gs, 0);
    this.track_dir = this.getDirection(this.track, adsbRaw.track, 0);
    this.hex = adsbRaw.hex;
    this.flight = adsbRaw.flight.trim();
    this.alt_baro = adsbRaw.alt_baro;
    this.gs = adsbRaw.gs;
    this.track = adsbRaw.track;
    this.squawk = adsbRaw.squawk;
    this.category = adsbRaw.category;
    this.latLon.push({
      lat: adsbRaw.lat,
      lon: adsbRaw.lon,
      time: new Date().getTime(),
    });
    this.time = new Date().getTime();
  }
}
// export interface ADSB {
//   hex: string;
//   flight: string;
//   alt_baro: number;
//   gs: number;
//   track: number;
//   squawk: string;
//   category: string;
//   time: number;
//   latLon: LatLon[];
// }
