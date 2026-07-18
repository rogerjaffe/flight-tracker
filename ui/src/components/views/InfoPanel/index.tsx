import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import ValueWithArrow from "../../helpers/ValueWithArrow.tsx";
import { calculateDirection } from "../../../utilities/calculateDirection.ts";
import { decodeLatLon } from "../../../utilities/decodeLatLon.ts";
import SecToHHMMSS from "../../helpers/SecToHHMMSS";
import ScheduledTimes from "./ScheduledTimes.tsx";
import EstimatedTimes from "./EstimatedTimes.tsx";
import { calculateDistance } from "../../../utilities/calculateDistance.ts";
import { calculateBearing } from "../../../utilities/calculateBearing.ts";
import LateEarly from "../../helpers/LateEarly.tsx";
import { useCallback, useMemo, useState } from "preact/hooks";
import Modal from "../../helpers/Modal.tsx";
import Settings from "../Settings.tsx";
import FitText from "../../helpers/FitText.tsx";
import InfoPanelWrapper from "../../structure/InfoPanelWrapper.tsx";
import InfoPanelItem from "../../structure/InfoPanelItem.tsx";

const InfoPanel = () => {
  const { flightInfo, realTime, config } = useFlightInfo();
  const [isOpen, setIsOpen] = useState(false);
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

  const settingsClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeSettings = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const countryLogoUrl =
    config?.app.flag_url +
    flightInfo["aircraft.country.alpha2"] +
    config?.app.flag_url_ext;

  const airlineName = useMemo(() => {
    let airlineName = "Unknown";
    if (flightInfo["airline.name"]) {
      airlineName = flightInfo["airline.name"]
        .replace("Airlines", "")
        .replace("Air Lines", "")
        .replace("Airways", "");
    }
    return airlineName;
  }, [flightInfo["airline.name"]]);

  return (
    <div class="text-[13px]">
      <div class="h-14.5 text-lg font-bold uppercase tracking-wide border-b ft-text-airline">
        <FitText>{airlineName}</FitText>
      </div>
      {/* Row 2: Occupies vertical space but forces data items flush into a tight single-spaced index stack */}
      <InfoPanelWrapper>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Flight number:</span>
          <span class="px-1 rounded-none">
            {flightInfo["identification.callsign"].substring(3)}
          </span>
        </div>

        <InfoPanelItem>
          <span class="font-bold">Airline ICAO/IATA:</span>
          <span class="px-1 rounded-none">
            {`${flightInfo["airline.code.icao"] ?? "---"} / ${flightInfo["airline.code.iata"] ?? "---"}`}
          </span>
        </InfoPanelItem>

        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
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

        <div class="flex justify-between border-b py-1 pl-1 pr-1">
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

        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
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

        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Squawk:</span>
          <span class="px-1 rounded-none">
            {realTime.squawk ? realTime.squawk : "---"}
          </span>
        </div>

        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">ICAO:</span>
          <span class="px-1 rounded-none">
            {realTime.hex?.toUpperCase() ?? ""}
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Registration:</span>
          <span class="px-1 rounded-none">
            <img
              class="w-7 h-4 pb-1 pr-2 inline-block"
              src={countryLogoUrl.toLowerCase()}
              alt={flightInfo["airline.code.icao"]}
            />
            {flightInfo["aircraft.registration"]}
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Position:</span>
          <span class="px-1 rounded-none">{decodeLatLon(realTime.latLon)}</span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Aircraft:</span>
          <span class="px-1 rounded-none">
            {flightInfo["aircraft.model.text"]}
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Sched:</span>
          <span class="px-1 rounded-none">
            <ScheduledTimes showLate={false} />
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Act/ETA:</span>
          <span class="px-1 rounded-none">
            <EstimatedTimes showLate={true} />
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Late/Early:</span>
          <span class="px-1 rounded-none">
            <LateEarly />
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
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
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
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
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Distance:</span>
          <span class="px-1 rounded-none">{dx ? dx + " mi" : null}</span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Bearing:</span>
          <span class="px-1 rounded-none">
            {bearing ? bearing + "°" : ""} {direction}
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Observed:</span>
          <span class="px-1 rounded-none">
            {observed ? observed : "Unknown"}
          </span>
        </div>
        <div class="flex justify-between border-b py-0.5 pl-1 pr-1">
          <span class="font-bold">Lookup link:</span>
          <span class="px-1 rounded-none">
            <a
              href={faLookup + flightInfo["identification.callsign"]}
              target="_blank"
              rel="noreferrer noopener"
              class="ft-a-link"
            >
              FlightAware
            </a>
          </span>
        </div>
        <div class="flex justify-between pt-3 pl-1 pr-1">
          <button
            class="ft-button inline-flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-lg shadow-sm transition-colors duration-150"
            onClick={settingsClick}
          >
            Settings
          </button>
        </div>
      </InfoPanelWrapper>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Flight Tracker Settings"
      >
        <Settings closeClick={closeSettings} />
      </Modal>
    </div>
  );
};

export default InfoPanel;
