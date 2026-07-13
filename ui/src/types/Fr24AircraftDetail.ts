export interface Fr24AircraftDetail {
  result: Result;
  _api: Api;
}

export interface Result {
  request: Request;
  response: Response;
}

export interface Request {
  query: string;
  limit: number;
  format: string;
  origin: any;
  destination: any;
  fetchBy: string;
  callback: any;
  token: any;
  pk: any;
}

export interface Response {
  aircraft: Aircraft;
  flight: any;
}

export interface Aircraft {
  item: Item;
  timestamp: number;
  data: Daum[];
  live: any;
}

export interface Item {
  current: number;
}

export interface Daum {
  model: Model;
  registration: string;
  country: Country;
  hex: string;
  airline: Airline;
}

export interface Model {
  code: string;
  text: string;
  id: number;
}

export interface Country {
  id: number;
  name: string;
  alpha2: string;
  alpha3: string;
}

export interface Airline {
  name: string;
  code: Code;
}

export interface Code {
  iata: string;
  icao: string;
}

export interface Api {
  copyright: string;
  legalNotice: string;
}
