from config_defaults import ADSBServer, UserConfig, AppConfig

# Use your latitude / longitude here
#
# The radius (in km) is only used for the Airplanes Live server. A larger
# radius will retrieve more flights, but if there are too many
# the server will get rate limited and you'll have to lower the
# radius.  I've had good luck at 60km
user_config = UserConfig(lat=32.800016, lon=-117.052769, radius=60)

# Enable the ADS-B servers with is_enabled=True.

# Local ADS-B receivers, hence the local network IP address
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

# Fallback airplanes_live_server -- if you're not running a local receiver
# is a public server, but do not change the interval due to the API's rate limitation
airplanes_live_server = ADSBServer(
  server_number=0,
  name="airplanes.live",
  url=f"https://api.airplanes.live/v2/point/{user_config.lat}/{user_config.lon}/{user_config.radius}",
  data_path="ac",
  interval=10,
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

    # Customize other options here in the same fashion as in UserConfig above
    self.app = AppConfig()

    # include all define ADS-B servers here
    self.adsb_servers = [airplanes_live_server, flightaware_server, piaware_server]
    check_config(self.user, self.app)

  def get_config(self):
    return vars(self)
