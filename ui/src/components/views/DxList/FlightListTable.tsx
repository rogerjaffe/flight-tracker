import { appStore } from "../../../store.ts";
import type { FlightList } from "../../../types/FlightList.ts";
import AirlineLogoAndFlight from "../../helpers/AirlineLogoAndFlight.tsx";
import FromTo from "../../helpers/FromTo.tsx";
import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import { calculateDistance } from "../../../utilities/calculateDistance.ts";
import { calculateDirection } from "../../../utilities/calculateDirection.ts";
import { calculateBearing } from "../../../utilities/calculateBearing.ts";

const FlightListTable = ({
  items,
  callsign,
  idx,
  isRightSide = false,
}: {
  items: FlightList;
  callsign: string;
  idx: number;
  isRightSide?: boolean;
}) => {
  const { config } = useFlightInfo();

  const homeLat = config.user.lat;
  const homeLon = config.user.lon;
  const units = "mi";

  const flightClicked = (hex: string) => () => {
    console.log("clicked", hex);
    if (appStore.worker.value) {
      appStore.worker.value.postMessage({ action: "get_this_flight", hex });
    }
  };

  return (
    <table
      id={"flightList" + idx}
      class={`w-full text-left tabular-nums text-[13px] border-separate border-spacing-0 table-fixed ${isRightSide ? "" : "border-r-2"}`}
    >
      <thead class="sticky top-0 z-20 ft-bg-flight-list-header shadow-sm">
        <tr class="dynamic-nums text-sm font-bold uppercase tracking-wider rounded-2xl">
          <th class="w-[30%] text-center pt-1 pb-1 border-b-2 border-r">
            Flight
          </th>
          <th class="w-[30%] text-center pt-1 pb-1 border-b-2 border-r">
            From/To
          </th>
          <th class="w-[20%] text-center pt-1 pb-1 border-b-2 border-r">Dir</th>
          <th class="w-[20%] text-center pt-1 pb-1 border-b-2">Dx</th>
        </tr>
      </thead>

      {/* DATA CONTAINER PORT */}
      <tbody class="divide-y">
        {items.map((item) => {
          const highlightClasses = "ft-highlight-class";
          const isHighlight =
            item.callsign === callsign ? highlightClasses : "";

          const dx = calculateDistance(
            homeLat,
            homeLon,
            item.lat,
            item.lon,
            units,
          );

          const course = calculateBearing(homeLat, homeLon, item.lat, item.lon);
          const bearing = isNaN(course) ? "" : calculateDirection(course);
          return (
            <tr
              key={item.callsign}
              class={`transition-colors cursor-pointer ${isHighlight ? highlightClasses : ""}`}
            >
              <td
                class={`pt-0.5 pb-0.5 font-bold pr-1 border-b flex items-center justify-center gap-1.5 border-r`}
                onClick={flightClicked(item.hex)}
              >
                <AirlineLogoAndFlight item={item} />
              </td>
              <td
                class="pt-0.5 pb-0.5 text-center font-mono border-r border-b"
                onClick={flightClicked(item.hex)}
              >
                <FromTo item={item} />
              </td>
              <td
                onClick={flightClicked(item.hex)}
                class="pt-0.5 pb-0.5 border-r border-b text-center"
              >
                {isNaN(course) ? (
                  <span class="pl-0.5">Unavailable</span>
                ) : (
                  <span class="pl-1">{`${course.toFixed(0)}° ${bearing}`}</span>
                )}
              </td>
              <td
                onClick={flightClicked(item.hex)}
                class="pt-0.5 pb-0.5 border-b text-center"
              >
                {isNaN(dx) ? `---` : `${dx} ${units}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FlightListTable;
