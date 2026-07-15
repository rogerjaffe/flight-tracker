export interface UserConfig {
  lat: number;
  lon: number;
  radius: number;
}

export interface AppConfig {
  width: number;
  height: number;
  airline_logo_url: string;
  airline_logo_url_ext: string;
  proxy: string;
  stale_age_seconds: number;
  refresh_flight_list_interval: number;
  display_new_flight_interval: number;
  get_flight_list_interval: number;
  get_dark_mode_interval: number;
  clean_interval: number;
  flight_aware_flight_lookup: string;
  flag_url: string;
  flag_url_ext: string;
}

export interface ADSBServer {
  name: string;
  url: string;
  data_path: string;
  interval: number;
  is_enabled: boolean;
  server_number: number;
  stale_age: number; // Added since your instances utilize this property
}

export interface Config {
  user: UserConfig;
  app: AppConfig;
  adsb_servers: ADSBServer[];
}
