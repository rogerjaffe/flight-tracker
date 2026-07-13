import type { Fr24FlightDetail } from "./Fr24FlightDetail.ts";

export interface Fr24FlightResponse {
  result: Result;
  _api: Api;
}

export interface Result {
  request: Request;
  response: Response;
}

export interface Request {
  callback: any;
  device: any;
  fetchBy: string;
  filterBy: any;
  format: string;
  limit: number;
  olderThenFlightId: any;
  page: number;
  pk: any;
  query: string;
  timestamp: any;
  token: any;
}

export interface Response {
  item: Item;
  page: Page;
  timestamp: number;
  data: Fr24FlightDetail[];
  aircraftInfo: AircraftInfo;
  aircraftImages: AircraftImage[];
}

export interface Item {
  current: number;
  total: any;
  limit: number;
}

export interface Page {
  current: number;
  more: boolean;
  total: any;
}

export interface AircraftInfo {
  model: Model2;
  registration: string;
  country: Country4;
  hex: string;
  restricted: boolean;
  serialNo: any;
  age: Age2;
  availability: Availability2;
  owner: Owner2;
  airline: Airline2;
}

export interface Model2 {
  code: string;
  text: string;
}

export interface Country4 {
  id: number;
  name: string;
  alpha2: string;
  alpha3: string;
}

export interface Age2 {
  availability: boolean;
}

export interface Availability2 {
  serialNo: boolean;
  age: boolean;
}

export interface Owner2 {
  name: string;
  code: Code5;
}

export interface Code5 {
  iata: string;
  icao: string;
}

export interface Airline2 {
  name: string;
  code: Code6;
  short: string;
}

export interface Code6 {
  iata: string;
  icao: string;
}

export interface AircraftImage {
  registration: string;
  images: Images;
}

export interface Images {
  thumbnails: Thumbnail[];
  medium: Medium[];
  large: Large[];
}

export interface Thumbnail {
  src: string;
  link: string;
  copyright: string;
  source: string;
}

export interface Medium {
  src: string;
  link: string;
  copyright: string;
  source: string;
}

export interface Large {
  src: string;
  link: string;
  copyright: string;
  source: string;
}

export interface Api {
  copyright: string;
  legalNotice: string;
}
