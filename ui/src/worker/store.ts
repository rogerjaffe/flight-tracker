import { type ADSBRaw, RealTime } from "../types/ADSB.ts";
import type { Config } from "../types/Config.ts";
import { FlightRec } from "../types/FlightRec.ts";
import type { Fr24FlightDetailFlat } from "../types/Fr24FlightDetailFlat.ts";
import type { FlightList } from "../types/FlightList.ts";

interface State {
  config: Config | null;
  flightList: Map<string, FlightRec>;
  suspend: number;
}

export class Store {
  private state: State = {
    config: null,
    flightList: new Map(),
    suspend: 0,
  };

  public getState(): State {
    return this.state;
  }

  public getConfig(): Config | null {
    return this.state.config;
  }

  public setConfig(config: Config): void {
    this.state.config = config;
  }

  private bumpDisplayQueue(): void {
    this.state.flightList.forEach((flight) => {
      if (flight.displayQueue !== null) {
        flight.displayQueue += 1;
      }
    });
  }

  public getFlights(): FlightRec[] {
    return [...this.state.flightList.values()];
  }

  public getFlightList(): FlightList {
    const flights = this.getFlightsToDisplay();
    const filtered = flights.filter((flight) => !!flight.flightInfo);

    return filtered.map((flight) => {
      const flightInfo = flight.flightInfo as Fr24FlightDetailFlat;
      const realTime = flight.realTime as RealTime;
      return {
        hex: flightInfo["aircraft.hex"],
        callsign: flightInfo["identification.callsign"],
        origin: flightInfo["airport.origin.code.iata"],
        destination: flightInfo["airport.destination.code.iata"],
        altitude: realTime.alt_baro,
        altitudeDir: realTime.alt_baro_dir,
        speed: realTime.gs,
        speedDir: realTime.gs_dir,
      };
    });
  }

  private rotateDisplayQueue(): void {
    let max = -1;
    let maxHex = "";
    const flights = this.getFlights();

    // Step 1: Find the flight with the highest displayQueue value
    flights.forEach((flight) => {
      if (flight.displayQueue !== null && flight.displayQueue > max) {
        max = flight.displayQueue;
        maxHex = flight.hex;
      }
    });

    // Step 2: Increment everyone, then set the old maximum item to 0
    if (maxHex !== "") {
      flights.forEach((flight) => {
        if (flight.displayQueue !== null) {
          flight.displayQueue++;
        }
      });

      // This overrides the increment for the max item, resetting it to 0
      this.setDisplayQueue(maxHex, 0);
    }
  }

  public addFlight(flight: FlightRec): void {
    this.state.flightList.set(flight.hex, flight);
  }

  public setFlightDetail(hex: string, flightDet: Fr24FlightDetailFlat): void {
    const flight = this.getFlight(hex) ?? new FlightRec(hex);
    flight.setFlightDetail(flightDet);
  }

  public setDisplayQueue(hex: string, displayQueue: number): void {
    const flight = this.getFlight(hex) ?? new FlightRec(hex);
    flight.setDisplayQueue(displayQueue);
  }

  public addFlightDetail(hex: string, flightDet: Fr24FlightDetailFlat): void {
    this.bumpDisplayQueue();
    this.setFlightDetail(hex, flightDet);
    this.setDisplayQueue(hex, 0);
  }

  public getFlight(hex: string): FlightRec | null {
    return this.state.flightList.get(hex) ?? null;
  }

  public filterFlights(filter: (flight: FlightRec) => boolean): FlightRec[] {
    return Array.from(this.state.flightList.values()).filter(filter);
  }

  public removeFlight(hex: string): void {
    this.state.flightList.delete(hex);
  }

  public findNextFlightToRetrieve(): FlightRec | null {
    return this.filterFlights((f) => !f.flightInfo && !f.ignore)[0] ?? null;
  }

  public ignoreThisFlight(hex: string): void {
    const flight = this.getFlight(hex);
    if (!flight) return;
    flight.ignore = true;
  }

  public getFlightsToDisplay(): FlightRec[] {
    return this.filterFlights((f) => f.displayQueue !== null);
  }

  public getNextFlightToDisplay(): FlightRec | null {
    const flights = this.getFlightsToDisplay();
    let maxFlight: FlightRec | null = null;
    flights.forEach((flight) => {
      if (maxFlight === null) {
        maxFlight = flight;
      } else {
        if (
          (flight.displayQueue as number) > (maxFlight.displayQueue as number)
        ) {
          maxFlight = flight;
        }
      }
    });
    this.rotateDisplayQueue();
    return maxFlight;
  }

  public getThisFlight(hex: string): FlightRec | null {
    return this.getFlight(hex);
  }

  public addAdsb(hex: string, adsb: ADSBRaw): void {
    const flight = this.getFlight(hex) ?? new FlightRec(hex);
    const realTime = flight.realTime ?? new RealTime();
    realTime.update(adsb);
    flight.realTime = realTime;
    this.addFlight(flight);
  }

  public addAdsbList(adsbList: ADSBRaw[]): void {
    const regex = /^[A-Z]{3}[0-9]{1,4}$/;
    const filtered = adsbList.filter((adsb) => {
      if (!adsb.flight) return false;
      if (adsb.hex.startsWith("~")) return false;
      return adsb.flight.trim().match(regex);
    });
    filtered.forEach((adsb) => {
      this.addAdsb(adsb.hex, adsb);
    });
  }

  public addSuspend(): void {
    this.state.suspend += 1;
  }

  public shouldSuspend(): boolean {
    if (this.state.suspend > 0) {
      this.state.suspend -= 1;
      return true;
    }
    return false;
  }
}
