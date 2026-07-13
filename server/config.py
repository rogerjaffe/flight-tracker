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
    self.get_dark_mode_interval = kwargs.get('get_dark_mode_interval', 60)
    self.clean_interval = kwargs.get('clean_interval', 30)
    self.flight_aware_flight_lookup = kwargs.get('flight_aware_flight_lookup', 'https://www.flightaware.com/live/flight/')


class ADSBServer:
  def __init__(self, **kwargs):
    self.name = kwargs.get("name", f"adsb_server{kwargs.get('server_number', 0)}")
    self.url = kwargs.get("url")
    self.data_path = kwargs.get("data_path")
    self.interval = kwargs.get("interval", 10)
    self.is_enabled = kwargs.get("is_enabled", False)
    self.server_number = kwargs.get("server_number", 0)


user_config = UserConfig(lat=32.800016, lon=-117.052769, radius=60)
airplanes_live_server = ADSBServer(
  server_number=0,
  name="airplanes.live",
  url=f"https://api.airplanes.live/v2/point/{user_config.lat}/{user_config.lon}/{user_config.radius}",
  data_path="ac",
  interval=10,
  stale_age=60,
  is_enabled=False)
flightaware_server = ADSBServer(
  server_number=1,
  name="flightAware",
  url="http://192.168.0.64:8080/data/aircraft.json",
  data_path="aircraft",
  interval=1,
  stale_age=60,
  is_enabled=True)
piaware_server = ADSBServer(
  server_number=2,
  name="piAware",
  url="http://192.168.0.42:8080/data-978/aircraft.json",
  data_path="aircraft",
  interval=1,
  stale_age=60,
  is_enabled=False)


def check_config(user: UserConfig, app: AppConfig):
  lat = user.lat
  lon = user.lon
  radius = user.radius
  width = app.width
  height = app.height
  if not (-180 <= lon <= 180 and -90 <= lat <= 90):
    raise Exception("InvalidLatLon")
  if not (0 < float(radius) <= 10000):
    raise Exception("RadiusOutOfRange")
  if width is None or height is None:
    raise Exception("UnspecifiedSize")
  if not (width > 0 and height > 0):
    raise Exception("InvalidSize")
  return True


class Config:
  def __init__(self, **kwargs):
    self.user = UserConfig(lat=32.800016, lon=-117.052769, radius=60)
    self.app = AppConfig()
    self.adsb_servers = [airplanes_live_server, flightaware_server, piaware_server]
    check_config(self.user, self.app)

  def get_config(self):
    return vars(self)
