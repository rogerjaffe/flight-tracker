import { ARROWS } from "../../utilities/arrows.tsx";
import { appStore } from "../../store.ts";
import type { FlightList } from "../../types/FlightList.ts";
import ValueWithArrow from "../helpers/ValueWithArrow.tsx";

const FlightListTable = ({
  items,
  callsign,
  idx,
}: {
  items: FlightList;
  callsign: string;
  idx: number;
}) => {
  const config = appStore.config.value;
  const flightClicked = (hex: string) => () => {
    console.log("clicked", hex);
    if (appStore.worker.value) {
      appStore.worker.value.postMessage({ action: "get_this_flight", hex });
    }
  };

  const justify = (str: string) => {
    const n = str.substring(3);
    const j = n.padStart(4, "0");
    const a = str.substring(0, 3);
    return `${a} ${j}`;
  };

  return (
    <table
      id={"flightList" + idx}
      class="w-full text-left tabular-nums text-[13px] border-collapse table-fixed border-none"
    >
      <thead class="sticky top-0 text-sm font-bold uppercase tracking-wider z-20 shadow-sm ">
        <tr class="dynamic-nums border-b-2  bg-flight-list-header">
          <th class="w-[30%] text-center border-r  pt-1 pb-1">Flight</th>
          <th class="w-[30%] text-center border-r  pt-1 pb-1">From/To</th>
          <th class="w-[20%] text-center border-r  pt-1 pb-1">Alt</th>
          <th class="w-[20%] text-center pt-1 pb-1">Speed</th>
        </tr>
      </thead>

      {/* DATA CONTAINER PORT */}
      <tbody class="divide-y">
        {items.map((item) => {
          const airlineLogoSmall =
            config?.app.airline_logo_url +
            item.callsign.substring(0, 3) +
            config?.app.airline_logo_url_ext;
          const highlightClasses =
            "bg-yellow-300 dark:bg-yellow-600 text-black";
          const isHighlight =
            item.callsign === callsign ? highlightClasses : "";
          return (
            <tr
              key={item.callsign}
              class={`transition-colors cursor-pointer border-b ${isHighlight ? highlightClasses : ""}`}
            >
              <td
                class={`pt-0.5 pb-0.5 font-bold pr-1 border-r flex items-center justify-center gap-1.5`}
                onClick={flightClicked(item.hex)}
              >
                <img
                  class="w-5 h-5"
                  src={airlineLogoSmall}
                  alt={item.callsign}
                />
                <span>{justify(item.callsign)}</span>
              </td>
              <td
                class="pt-0.5 pb-0.5 text-center font-mono border-r "
                onClick={flightClicked(item.hex)}
              >
                <span>{item.origin ? item.origin : "---"}</span>
                <span
                  class="pl-2 pr-2"
                  style={{
                    width: "25px",
                    display: "inline-block",
                    verticalAlign: "middle",
                    transform: "translateY(-10%)",
                  }}
                >
                  {ARROWS.right}
                </span>
                <span>{item.destination ? item.destination : "---"}</span>
              </td>
              <td
                onClick={flightClicked(item.hex)}
                class="pt-0.5 pb-0.5 text-right border-r "
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
                class="pt-0.5 pb-0.5 text-right"
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
