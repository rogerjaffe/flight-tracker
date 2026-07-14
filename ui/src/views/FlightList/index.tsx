import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import ValueWithArrow from "../../utilities/ValueWithArrow.tsx";
import { ARROWS } from "../../utilities/arrows.tsx";
import { appStore } from "../../store.ts";

const FlightList = () => {
  const { flightList, flightInfo } = useFlightInfo();
  const sortedFlightList = flightList.toSorted((a, b) =>
    a.callsign > b.callsign ? 1 : -1,
  );

  const flightClicked = (hex: string) => () => {
    console.log("clicked", hex);
    if (appStore.worker.value) {
      appStore.worker.value.postMessage({ action: "get_this_flight", hex });
    }
  };

  return (
    <div class="h-[70%] w-full rounded-none overflow-y-auto relative">
      <table class="w-full text-left border-collapse table-fixed">
        {/* STICKY STACKED DUAL-HEADER */}
        <thead class="sticky top-0 text-sm font-bold uppercase tracking-wider z-20 shadow-sm ">
          <tr class="border-b border-gray-300 dark:border-white bg-gray-200 dark:bg-gray-800">
            {/* Left Side Header Blocks */}
            <th class="pl-2 pr-2 w-[14%] text-center">Flight</th>
            <th class="pl-2 pr-2 w-[14%] text-center">From/To</th>
            <th class="pl-2 pr-2 w-[12%] text-center">Alt</th>
            <th class="pl-2 pr-2 w-[10%] border-r text-center">Speed</th>

            {/* Right Side Header Blocks (Repeated) */}
            <th class="pl-2 pr-2 w-[14%] text-center">Flight</th>
            <th class="pl-2 pr-2 w-[14%] text-center">From/To</th>
            <th class="pl-2 pr-2 w-[12%] text-center">Alt</th>
            <th class="pl-2 pr-2 w-[10%] text-center">Speed</th>
          </tr>
        </thead>

        {/* DATA CONTAINER PORT */}
        <tbody class="text-[10pt] font-mono divide-y">
          {(() => {
            // Creates a looped sequence mapping half the rows left and half right side-by-side
            const rows = [];
            const halfLength = Math.ceil(sortedFlightList.length / 2);

            for (let i = 0; i < halfLength; i++) {
              const leftItem = sortedFlightList[i];
              const rightItem = sortedFlightList[i + halfLength] || null; // Safety fallback for odd numbers
              const highlightClasses = "bg-yellow-300 dark:bg-yellow-600";
              const leftIsHighlight =
                leftItem.callsign === flightInfo["identification.callsign"]
                  ? highlightClasses
                  : "";
              const rightIsHighlight =
                rightItem?.callsign === flightInfo["identification.callsign"]
                  ? highlightClasses
                  : "";
              rows.push(
                <tr
                  key={i}
                  class="transition-colors border-b border-gray-300 cursor-pointer"
                >
                  {/* Left Wing Cell Metrics */}
                  <td
                    class={`pl-2 pr-2 pt-1 font-bold text-center ${leftIsHighlight}`}
                    onClick={flightClicked(leftItem.hex)}
                  >
                    {leftItem.callsign}
                  </td>
                  <td
                    class={`pl-2 pr-2 pt-1 text-center ${leftIsHighlight}`}
                    onClick={flightClicked(leftItem.hex)}
                  >
                    {leftItem.origin} <span>{ARROWS.right}</span>{" "}
                    {leftItem.destination ? leftItem.destination : "---"}
                  </td>
                  <td
                    class={`pl-2 pr-2 pt-1 text-right ${leftIsHighlight}`}
                    onClick={flightClicked(leftItem.hex)}
                  >
                    <ValueWithArrow
                      value={leftItem.altitude}
                      trend={leftItem.altitudeDir}
                      direction={"up-down"}
                      precede={true}
                    />
                  </td>
                  <td
                    class={`pl-2 pr-2 pt-1 text-right border-r ${leftIsHighlight}`}
                    onClick={flightClicked(leftItem.hex)}
                  >
                    <ValueWithArrow
                      value={leftItem.speed}
                      trend={leftItem.speedDir}
                      direction={"up-down"}
                      precede={true}
                    />
                  </td>

                  {/* Right Wing Cell Metrics */}
                  {rightItem ? (
                    <>
                      <td
                        class={`pl-2 pr-2 pt-1 font-bold text-center ${rightIsHighlight}`}
                        onClick={flightClicked(rightItem.hex)}
                      >
                        {rightItem.callsign}
                      </td>
                      <td
                        class={`pl-2 pr-2 pt-1 text-center ${rightIsHighlight}`}
                        onClick={flightClicked(rightItem.hex)}
                      >
                        {rightItem.origin} <span>{ARROWS.right}</span>{" "}
                        {rightItem.destination ? rightItem.destination : "---"}
                      </td>
                      <td
                        class={`pl-2 pr-2 pt-1 text-right ${rightIsHighlight}`}
                        onClick={flightClicked(rightItem.hex)}
                      >
                        <ValueWithArrow
                          value={rightItem.altitude}
                          trend={rightItem.altitudeDir}
                          direction={"up-down"}
                          precede={true}
                        />
                      </td>
                      <td
                        class={`pl-2 pr-2 pt-1 text-right ${rightIsHighlight}`}
                        onClick={flightClicked(rightItem.hex)}
                      >
                        <ValueWithArrow
                          value={rightItem.speed}
                          trend={rightItem.speedDir}
                          direction={"up-down"}
                          precede={true}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td class="pl-1 pr-1 pt-1 "></td>
                      <td class="pl-1 pr-1 pt-1"></td>
                      <td class="pl-1 pr-1 pt-1"></td>
                      <td class="pl-1 pr-1 pt-1"></td>
                    </>
                  )}
                </tr>,
              );
            }
            return rows;
          })()}
        </tbody>
      </table>
    </div>
  );
};

export default FlightList;
