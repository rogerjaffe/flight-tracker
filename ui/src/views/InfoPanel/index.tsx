import { version } from "../../../package.json";
import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import ValueWithArrow from "../../utilities/ValueWithArrow.tsx";
import { calculateDirection } from "../../utilities/calculateDirection.ts";
import { decodeLatLon } from "../../utilities/decodeLatLon.ts";
import SecToHHMMSS from "../../utilities/SecToHHMMSS";
import ScheduledTimes from "./ScheduledTimes.tsx";
import EstimatedTimes from "./EstimatedTimes.tsx";
import { calculateDistance } from "../../utilities/calculateDistance.ts";
import { calculateBearing } from "../../utilities/calculateBearing.ts";
import LateEarly from "../../utilities/LateEarly.tsx";

const InfoPanel = () => {
  const { flightInfo, realTime, config } = useFlightInfo();
  const faLookup = config?.app.flight_aware_flight_lookup;
  let thisLatLon = null;
  if (realTime.latLon.length > 0) {
    thisLatLon = realTime.latLon[realTime.latLon.length - 1];
  }
  const acLat = thisLatLon?.lat ?? null;
  const acLon = thisLatLon?.lon ?? null;
  const homeLat = config?.user.lat ?? null;
  const homeLon = config?.user.lon ?? null;
  const dx =
    acLat && acLon && homeLat && homeLon
      ? calculateDistance(homeLat, homeLon, acLat, acLon, "mi")
      : null;
  const bearingVal =
    acLat && acLon && homeLat && homeLon
      ? calculateBearing(homeLat, homeLon, acLat, acLon)
      : null;
  const bearing = bearingVal ? bearingVal.toFixed(0) : null;
  const direction = bearingVal ? calculateDirection(bearingVal) : null;
  const observedSecs = realTime.latLon
    ? Math.trunc(
        (realTime.latLon[realTime.latLon.length - 1].time -
          realTime.latLon[0].time) /
          1000,
      )
    : 0;
  const observed = <SecToHHMMSS sec={observedSecs} withSec={true} />;

  // SECTION 3 (Takes up 2/8 -> 25% width of canvas and spans full vertical height)
  return (
    <div class="w-[25%] h-full flex flex-col gap-0 border-l text-[14px]">
      {/* Row 1: Exactly 3/25 (12%) of entire canvas screen height */}
      <div class="h-[10%] flex items-center border-gray-300 justify-center text-center p-2 rounded-none border-b">
        <h2 class="text-lg font-bold uppercase tracking-wide">
          {flightInfo["airline.name"]
            ?.replace("Airlines", "")
            .replace("Air Lines", "")
            .replace("Airways", "")}
        </h2>
      </div>

      {/* Row 2: Occupies vertical space but forces data items flush into a tight single-spaced index stack */}
      <div class="flex-1 pb-3 flex flex-col justify-start font-sans rounded-none overflow-y-auto">
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Flight number:</span>
          <span class="px-1 rounded-none">
            {flightInfo["identification.callsign"].substring(3)}
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Altitude:</span>
          <span class="px-1 rounded-none">
            <ValueWithArrow
              value={realTime.alt_baro}
              trend={realTime.alt_baro_dir}
              direction="up-down"
              precede={true}
            />
            {" ft"}
          </span>
        </div>

        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Groundspeed:</span>
          <span class="px-1 rounded-none">
            <ValueWithArrow
              value={realTime.gs}
              trend={realTime.gs_dir}
              direction="up-down"
              precede={true}
            />
            {" kts"}
          </span>
        </div>

        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Heading:</span>
          <span class="px-1 rounded-none">
            <ValueWithArrow
              value={realTime.track}
              trend={realTime.track_dir}
              direction="left-right"
              precede={true}
            />
            {"° "}
            {calculateDirection(realTime.track)}
          </span>
        </div>

        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Squawk:</span>
          <span class="px-1 rounded-none">
            {realTime.squawk ? realTime.squawk : "---"}
          </span>
        </div>

        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">ICAO:</span>
          <span class="px-1 rounded-none">
            {realTime.hex?.toUpperCase() ?? ""}
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Registration:</span>
          <span class="px-1 rounded-none">
            {flightInfo["aircraft.registration"]}
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Position:</span>
          <span class="px-1 rounded-none">{decodeLatLon(realTime.latLon)}</span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Aircraft:</span>
          <span class="px-1 rounded-none">
            {flightInfo["aircraft.model.text"]}
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Sched:</span>
          <span class="px-1 rounded-none">
            <ScheduledTimes showLate={false} />
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Act/ETA:</span>
          <span class="px-1 rounded-none">
            <EstimatedTimes showLate={true} />
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Late/Early:</span>
          <span class="px-1 rounded-none">
            <LateEarly />
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Scheduled duration:</span>
          <span class="px-1 rounded-none">
            <SecToHHMMSS
              sec={
                flightInfo["time.scheduled.arrival"] -
                flightInfo["time.scheduled.departure"]
              }
              withSec={false}
            />
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Actual duration:</span>
          <span class="px-1 rounded-none">
            <SecToHHMMSS
              sec={
                flightInfo["time.estimated.arrival"] -
                flightInfo["time.real.departure"]
              }
              withSec={false}
              withCompare={true}
              compareWith={
                flightInfo["time.scheduled.arrival"] -
                flightInfo["time.scheduled.departure"]
              }
            />
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Distance:</span>
          <span class="px-1 rounded-none">{dx ? dx + " mi" : null}</span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Bearing:</span>
          <span class="px-1 rounded-none">
            {bearing ? bearing + "°" : ""} {direction}
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Observed:</span>
          <span class="px-1 rounded-none">
            {observed ? observed : "Unknown"}
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-0.5 pl-1 pr-1">
          <span class="font-bold">Lookup link:</span>
          <span class="px-1 rounded-none">
            <a
              href={faLookup + flightInfo["identification.callsign"]}
              target="_blank"
              rel="noreferrer noopener"
            >
              FlightAware
            </a>
          </span>
        </div>
        <div class="flex justify-between border-b border-gray-300 bg-gray-200 py-0.5 pl-1 pr-1 italic">
          <span class="font-bold">Flight Tracker</span>
          <span class="px-1 rounded-none">Version {version}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
