import type { Direction } from "./Direction.ts";

export type FlightListItem = {
  hex: string;
  callsign: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  altitude: number;
  altitudeDir: Direction;
  speed: number;
  speedDir: Direction;
  lat: number;
  lon: number;
};

export type FlightList = FlightListItem[];
