import { useFlightInfo } from "../providers/FlightInfoProvider.tsx";
import { useMemo } from "preact/hooks";
import { calculateDistance } from "../../utilities/calculateDistance.ts";

const ProgressBar = () => {
  const { flightInfo, realTime } = useFlightInfo();

  const dxs = useMemo(() => {
    const oLat = flightInfo["airport.origin.position.latitude"];
    const oLon = flightInfo["airport.origin.position.longitude"];
    const dLat = flightInfo["airport.destination.position.latitude"];
    const dLon = flightInfo["airport.destination.position.longitude"];
    const lat = realTime.latLon[realTime.latLon.length - 1].lat;
    const lon = realTime.latLon[realTime.latLon.length - 1].lon;
    const oDx = calculateDistance(oLat, oLon, lat, lon, "mi");
    const dDx = calculateDistance(dLat, dLon, lat, lon, "mi");
    const totalDx = oDx + dDx;
    const pct = totalDx === 0 ? 0 : Math.round((oDx / totalDx) * 100);
    return { oDx, dDx, pct };
  }, [flightInfo, realTime ?? null]);

  // Generate the progress bar
  const pb = useMemo(() => {
    // Define your dynamic percentage variable here
    const percentage = dxs.pct;
    const isGreaterThanTen = percentage > 10;
    if (isNaN(percentage)) {
      return (
        <div class="w-full justify-center items-center px-2 rounded-2xl text-center text-[16px]">
          Current position is unavailable
        </div>
      );
    } else {
      return (
        <div class="w-full ft-bg-progress-bar h-5 overflow-hidden rounded-2xl items-center">
          {/* Dynamic FILL tracking container wrapper */}
          <div
            class="h-full relative flex items-center transition-all duration-300"
            style={{ width: `${percentage}%` }}
          >
            {/* Main Filled progress element */}
            <div class="absolute inset-0 ft-fill-progress-bar rounded-l-2xl"></div>

            {/* DYNAMIC TEXT PLACEMENT ENGINE */}
            <span
              class={`absolute top-1/2 -translate-y-1/2 text-[12px] font-black tracking-tighter whitespace-nowrap z-10 transition-all duration-300 ${
                isGreaterThanTen
                  ? "right-2 text-black ft-fill-progress-bar " // Inside the bar, flush right
                  : "left-[calc(100%+8px)] text-black ft-bg-progress-bar " // Outside the bar, pushed right
              }`}
            >
              {percentage}%
            </span>
          </div>
        </div>
      );
    }
  }, [dxs.pct ?? 0]);

  return <div class="col-span-full mt-3 pl-5 pr-5">{pb}</div>;
};

export default ProgressBar;
