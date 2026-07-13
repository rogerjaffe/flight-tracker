import type { Direction } from "./Direction.ts";

export type FlightListItem = {
  hex: string;
  callsign: string;
  origin: string;
  destination: string;
  altitude: number;
  altitudeDir: Direction;
  speed: number;
  speedDir: Direction;
};

export type FlightList = FlightListItem[];
