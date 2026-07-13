import datetime
import os
import signal

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from curl_cffi import requests
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from suntime import Sun

from config import Config

# Helper function to trigger the OS shutdown signal safely
def shutdown_process():
    # Sends a SIGINT (equivalent to pressing Ctrl+C in your terminal) to the server process
    os.kill(os.getpid(), signal.SIGINT)

app = FastAPI()


class UrlRoute(BaseModel):
  url: str

class HexCodeRoute(BaseModel):
  hex_code: str

class RegRoute(BaseModel):
  reg: str


# Define the origins that are allowed to make requests to your API
origins = [
  "http://localhost:3000",  # Common React/Vue local dev port
  "http://localhost:5173",  # Your production domain
]

# Add the CORS middleware to the application
app.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=origins,            # Allows specific domains
    allow_credentials=True,           # Allows cookies and authorization headers
    allow_methods=["*"],              # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all request headers
)

# ----------------------------------------------------
# 1. API ROUTES (Must be declared BEFORE static files)
# ----------------------------------------------------

@app.get("/api/config")
def get_config():
  """Returns the dictionary configuration from config.py."""
  return Config().get_config()


@app.post("/api/reg")
async def get_reg(hex_code: HexCodeRoute):
  try:
    response = requests.get(url=f"https://api.flightradar24.com/common/v1/search.json?fetchBy=reg&query={hex_code.hex_code}", timeout=5, impersonate='chrome146')
    try:
      return response.json()
    except Exception:
      return {"error": "Failed to parse JSON response"}
  except Exception as e:
    return {"error": f"An error occurred: {str(e)}"}

@app.post("/api/flight")
async def get_flight(reg: RegRoute):
  try:
    response = requests.get(url=f"https://api.flightradar24.com/common/v1/flight/list.json?&fetchBy=reg&page=1&limit=25&query={reg.reg}", timeout=5, impersonate='chrome146')
    try:
      return response.json()
    except Exception:
      return {"error": "Failed to parse JSON response"}
  except Exception as e:
    return {"error": f"An error occurred: {str(e)}"}

@app.post("/api/adsb")
async def fetch_external_url(url: UrlRoute):
  """
  Fetches an external URL using curl_cffi to bypass advanced TLS fingerprints.
  Example: /api/url?url=https://httpbin.org
  """
  if not url.url.startswith(("http://", "https://")):
    raise HTTPException(status_code=400, detail="Invalid URL protocol. Use http or https.")

  try:
    # Use AsyncSession for non-blocking HTTP requests within FastAPI
    response = requests.get(url.url, timeout=5, impersonate='chrome146')
    # response = await session.get(url, timeout=10.0)

    # Attempt to return raw JSON data if the target responds with JSON
    try:
      return response.json()
    except Exception:
      # Fallback to plain text if the target is HTML/text
      return {"content": response.text}

  except Exception as e:
    raise HTTPException(status_code=502, detail=f"Failed to fetch external URL: {str(e)}")

@app.get("/api/darkmode")
async def get_darkmode():
  config = Config().get_config()
  user = config.get('user')
  if user is None:
    return {"darkmode": False}
  home_lat = user.lat
  home_lon = user.lon
  if home_lat is None or home_lon is None:
    return {"darkmode": False}
  sun = Sun(home_lat, home_lon)
  now = datetime.datetime.now()
  sunrise_utc = sun.get_sunrise_time(now)
  sunset_utc = sun.get_sunset_time(now)
  local_sunrise = sunrise_utc.astimezone()
  local_sunset = sunset_utc.astimezone()

  # --- FIX FOR SUNTIME BUG ---
  # If sunset is calculated as earlier than sunrise, it grabbed yesterday's data.
  # We shift it forward by 1 day to match the correct local "today".
  if local_sunset < local_sunrise:
    local_sunset += datetime.timedelta(days=1)

  now_aware = now.astimezone()
  if local_sunrise <= now_aware <= local_sunset:
    return {"darkmode": False}
  else:
    return {"darkmode": True}

# 3. Static Files Mounting with html=True (Fallback safety net)
@app.post("/api/stop")
@app.get("/api/stop")  # Supporting both methods for easy testing in browser or code
async def stop_server(background_tasks: BackgroundTasks):
  """
  Gracefully shuts down the Uvicorn web server process.
  """
  # Use FastAPI BackgroundTasks to ensure the server sends the HTTP response
  # back to the client BEFORE the process actually dies.
  background_tasks.add_task(shutdown_process)

  return {
    "status": "shutdown_initiated",
    "message": "The server process is closing gracefully."
  }

# ----------------------------------------------------
# 2. STATIC FILES MOUNTING (Acts as the fallback root)
# ----------------------------------------------------
# Maps '/' directly to the 'static' folder.
# Automatically routes '/' to 'static/index.html' due to html=True.
app.mount("/", StaticFiles(directory="../ui/dist", html=True), name="static")