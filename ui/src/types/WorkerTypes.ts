import type { ADSBRaw } from "./ADSB.ts";
import type { Fr24AircraftDetail } from "./Fr24AircraftDetail.ts";
import type { Fr24FlightDetail } from "./Fr24FlightDetail.ts";
import type { Config } from "./Config.ts";
import type { FlightList } from "./FlightList.ts";
import type { FlightRec } from "./FlightRec.ts";

// Raw API payload structures
export interface RawFastItem {
  id: string;
  value: string | number;
}

export interface RawSlowItem {
  id: string;
  amount: number;
}

// Processed state shapes
export interface ProcessedFastItem {
  id: string;
  displayValue: string;
}

export type ProcessedSlowData = number;

// Strictly typed Web Worker message channels
export type WorkerMessageType =
  | "ADSB"
  | "REG"
  | "FLIGHT"
  | "FAST_UPDATE"
  | "SLOW_UPDATE"
  | "CONFIG"
  | "ERROR";

export interface ADSBUpdateResponse {
  type: "ADSB";
  data: ADSBRaw[]; // Strictly mapped to 'ADSB'
  error?: never;
  origin?: never;
}

export interface Fr24AircraftUpdateResponse {
  type: "REG";
  data: Fr24AircraftDetail; // Strictly mapped to 'ADSB'
  error?: never;
  origin?: never;
}

export interface Fr24FlightUpdateResponse {
  type: "FLIGHT";
  data: Fr24FlightDetail; // Strictly mapped to 'ADSB'
  error?: never;
  origin?: never;
}

export interface ConfigResponse {
  type: "CONFIG";
  data: Config;
  error?: never;
  origin?: never;
}

export interface FastUpdateResponse {
  type: "FAST_UPDATE";
  data: ProcessedFastItem[]; // Strictly mapped to 'FAST_UPDATE'
  error?: never;
  origin?: never;
}

export interface SlowUpdateResponse {
  type: "SLOW_UPDATE";
  data: ProcessedSlowData; // Strictly mapped to 'SLOW_UPDATE' (number)
  error?: never;
  origin?: never;
}

export interface FlightToDisplayResponse {
  type: "FLIGHT_TO_DISPLAY";
  data: FlightRec;
  error?: never;
  origin?: never;
}

export interface DarkmodeResponse {
  type: "DARKMODE";
  data: boolean;
  error?: never;
  origin?: never;
}

export interface FlightListResponse {
  type: "FLIGHT_LIST";
  data: FlightList;
  error?: never;
  origin?: never;
}

export interface WorkerErrorResponse {
  type: "ERROR";
  error: string;
  origin: WorkerMessageType; // Indicates which type of update caused the error
  data?: never;
}

// Combine them into the final union
export type WorkerResponse =
  | FastUpdateResponse
  | SlowUpdateResponse
  | WorkerErrorResponse
  | ADSBUpdateResponse
  | ConfigResponse
  | Fr24AircraftUpdateResponse
  | FlightToDisplayResponse
  | FlightListResponse
  | DarkmodeResponse
  | Fr24FlightUpdateResponse;

export interface WorkerRequest {
  action: "start" | "get_this_flight";
  hex?: string;
}
