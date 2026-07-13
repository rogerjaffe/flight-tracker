import { RealTime } from "./ADSB.ts";
import type { Fr24FlightDetailFlat } from "./Fr24FlightDetailFlat.ts";

export class FlightInfo {
  [key: string]: string | number | boolean | undefined | null;

  constructor(data: Record<string, any>) {
    Object.assign(this, data);
  }
}

export class FlightRec {
  hex: string = "";
  ignore: boolean = false;
  realTime: RealTime | null = null;
  flightInfo: Fr24FlightDetailFlat | null = null;
  displayQueue: number | null = null;

  constructor(hex: string) {
    this.hex = hex;
  }

  setFlightDetail(flightInfo: Fr24FlightDetailFlat) {
    this.flightInfo = flightInfo;
  }

  setDisplayQueue(displayQueue: number) {
    this.displayQueue = displayQueue;
  }
}
