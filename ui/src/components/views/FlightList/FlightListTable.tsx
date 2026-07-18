import { appStore } from "../../../store.ts";
import type { FlightList } from "../../../types/FlightList.ts";
import ValueWithArrow from "../../helpers/ValueWithArrow.tsx";
import AirlineLogoAndFlight from "../../helpers/AirlineLogoAndFlight.tsx";
import FromTo from "../../helpers/FromTo.tsx";

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
  const flightClicked = (hex: string) => () => {
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
          <th class="w-[20%] text-center pt-1 pb-1 border-b-2 border-r">Alt</th>
          <th class="w-[20%] text-center pt-1 pb-1 border-b-2">Speed</th>
        </tr>
      </thead>

      {/* DATA CONTAINER PORT */}
      <tbody class="divide-y">
        {items.map((item) => {
          const highlightClasses = "ft-highlight-class";
          const isHighlight =
            item.callsign === callsign ? highlightClasses : "";
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
                class="pt-0.5 pb-0.5 text-right border-r border-b"
              >
                <ValueWithArrow
                  value={item.altitude}
                  trend={item.altitudeDir}
                  direction={"up-down"}
                  precede={false}
                />
              </td>
              <td
                onClick={flightClicked(item.hex)}
                class="pt-0.5 pb-0.5 text-right border-b"
              >
                <ValueWithArrow
                  value={item.speed}
                  trend={item.speedDir}
                  direction={"up-down"}
                  precede={false}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FlightListTable;
