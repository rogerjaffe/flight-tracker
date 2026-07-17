import OriginDestinationIata from "./OriginDestinationIata.tsx";
import OriginDestinationCity from "./OriginDestinationCity.tsx";
import { useMemo } from "preact/hooks";
import { calculateDistance } from "../../../../utilities/calculateDistance.ts";
import { useFlightInfo } from "../../../providers/FlightInfoProvider.tsx";
import { appStore } from "../../../../store.ts";

const Middle = () => {
  const { flightInfo, realTime } = useFlightInfo();
  const displayContent = appStore.displayContent;

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

  const nextViewClick = () => {
    if (displayContent.value === "flight") {
      displayContent.value = "map";
    } else if (displayContent.value === "map") {
      displayContent.value = "flight";
    }
  };

  // Generate the progress bar
  const pb = useMemo(() => {
    // Define your dynamic percentage variable here
    const percentage = dxs.pct;
    const isGreaterThanTen = percentage > 10;
    if (isNaN(percentage)) {
      return (
        <div class="h-[15%] w-full flex justify-center items-center px-2 rounded-2xl text-center text-[16px]">
          Current position is unavailable
        </div>
      );
    } else {
      return (
        <div class="h-[15%] w-full flex items-center px-2 rounded-2xl">
          {/* Container holding the background tracks */}
          <div class="w-full bg-gray-400 h-5 overflow-hidden rounded-2xl relative flex items-center">
            {/* Dynamic FILL tracking container wrapper */}
            <div
              class="h-full relative flex items-center transition-all duration-300"
              style={{ width: `${percentage}%` }}
            >
              {/* Main Filled progress element */}
              <div class="absolute inset-0 bg-yellow-400 rounded-l-2xl"></div>

              {/* DYNAMIC TEXT PLACEMENT ENGINE */}
              <span
                class={`absolute top-1/2 -translate-y-1/2 text-[12px] font-black tracking-tighter whitespace-nowrap z-10 transition-all duration-300 ${
                  isGreaterThanTen
                    ? "right-2 text-black bg-yellow-400 " // Inside the bar, flush right
                    : "left-[calc(100%+8px)] text-black bg-gray-400 " // Outside the bar, pushed right
                }`}
              >
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
  }, [dxs.pct]);

  return (
    <div class="w-[80%] h-full flex flex-col gap-0">
      {/* Row 1 (50% Height) -> Divided into 3 Columns */}
      <div class="h-[55%] w-full flex flex-row gap-0">
        {/* Col 1: Equal Width Left */}
        <div class="flex-1 flex items-center justify-center text-7xl rounded-none">
          <OriginDestinationIata isOrigin={true} />
        </div>
        {/* Col 2: Arrow Character Only Container */}
        <div
          class="w-10 flex items-center justify-center text-5xl font-bold rounded-none"
          onClick={nextViewClick}
        >
          ▶
        </div>
        {/* Col 3: Equal Width Right */}
        <div class="flex-1 flex items-center justify-center text-7xl rounded-none">
          <OriginDestinationIata isOrigin={false} />{" "}
        </div>
      </div>
      {/* Row 2 (16.66% Height) -> Divided into 3 Columns */}
      <div class="h-[18%] w-full flex flex-row gap-0">
        <div class="flex-1 flex items-center justify-center text-lg font-semibold rounded-none">
          <OriginDestinationCity isOrigin={true} />
        </div>
        <div class="w-10 bg-transparent"></div>
        <div class="flex-1 flex items-center justify-center text-lg font-semibold rounded-none">
          <OriginDestinationCity isOrigin={false} />
        </div>
      </div>
      {/* Row 3 (16.66% Height) -> Divided into 3 Columns */}
      <div class="h-[12%] w-full flex flex-row gap-0">
        <div class="flex-1 flex items-center justify-center text-sm rounded-none">
          <div id="origin-dx">
            {isNaN(dxs.oDx) ? "" : dxs.oDx.toLocaleString()} mi
          </div>
        </div>
        <div class="w-10 bg-transparent"></div>
        <div class="flex-1  flex items-center justify-center text-sm rounded-none">
          <div id="destination-dx">
            {isNaN(dxs.dDx) ? "" : dxs.dDx.toLocaleString()} mi
          </div>
        </div>
      </div>
      {pb}
    </div>
  );
};

export default Middle;
