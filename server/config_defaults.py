class UserConfig:
  def __init__(self, **kwargs):
    self.lat = kwargs.get("lat", 32.798032)
    self.lon = kwargs.get('lon', -117.050881)
    self.radius = kwargs.get('radius', 30)


class AppConfig:
  def __init__(self, **kwargs):
    self.width = kwargs.get('width', 1024)
    self.height = kwargs.get('height', 600)
    self.airline_logo_url = kwargs.get('airline_logo_url', "https://www.flightaware.com/images/airline_logos/180px/")
    self.airline_logo_url_ext = kwargs.get('airline_logo_url_ext', ".png")
    self.proxy = kwargs.get('proxy', "http://localhost:8000/api/adsb")
    self.stale_age_seconds = kwargs.get("stale_age_seconds", 60)
    self.display_new_flight_interval = kwargs.get('display_new_flight_interval', 12)
    self.refresh_flight_list_interval = kwargs.get('refresh_flight_list_interval', 2)
    self.get_flight_list_interval = kwargs.get('get_flight_list_interval', 10)
    self.get_dark_mode_interval = kwargs.get('get_dark_mode_interval', 10)
    self.clean_interval = kwargs.get('clean_interval', 30)
    self.flight_aware_flight_lookup = kwargs.get('flight_aware_flight_lookup', 'https://www.flightaware.com/live/flight/')
    self.flag_url = kwargs.get('flag_url', 'https://flagcdn.com/w320/')
    self.flag_url_ext = kwargs.get('flag_url_ext', '.png')


class ADSBServer:
  def __init__(self, **kwargs):
    self.name = kwargs.get("name", f"adsb_server{kwargs.get('server_number', 0)}")
    self.url = kwargs.get("url")
    self.data_path = kwargs.get("data_path")
    self.interval = kwargs.get("interval", 10)
    self.is_enabled = kwargs.get("is_enabled", False)
    self.server_number = kwargs.get("server_number", 0)
