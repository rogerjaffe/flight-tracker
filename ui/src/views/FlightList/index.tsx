import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import FlightListTable from "./FlightListTable.tsx";
import { useMemo } from "preact/hooks";

const FlightList = () => {
  const { flightList, flightInfo } = useFlightInfo();
  const sortedFlightList = flightList.toSorted((a, b) => {
    const aa = a.callsign.substring(0, 3);
    const ba = b.callsign.substring(0, 3);
    const an = a.callsign.substring(3).padStart(4, "0");
    const bn = b.callsign.substring(3).padStart(4, "0");
    return aa + an > ba + bn ? 1 : -1;
  });

  const items = useMemo(() => {
    const half = Math.ceil(sortedFlightList.length / 2);
    return {
      left: sortedFlightList.slice(0, half),
      right: sortedFlightList.slice(half),
    };
  }, [sortedFlightList]);

  return (
    <div class="h-[70%] w-full rounded-none relative flex flex-row">
      <div class="w-1/2 flex flex-col overflow-y-auto relative border-r-2">
        <FlightListTable
          items={items.left}
          callsign={flightInfo["identification.callsign"]}
          idx={1}
        />
      </div>
      <div class="w-1/2 flex flex-col overflow-y-auto relative">
        <FlightListTable
          items={items.right}
          callsign={flightInfo["identification.callsign"]}
          idx={2}
        />
      </div>
    </div>
  );
};

export default FlightList;
