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
    <div class="grid grid-cols-[1fr_1fr] gap-0 h-full min-h-0">
      <div class="min-h-0 overflow-y-auto relative">
        <FlightListTable
          items={items.left}
          callsign={flightInfo["identification.callsign"]}
          idx={1}
        />
      </div>
      <div class="min-h-0 overflow-y-auto relative">
        <FlightListTable
          items={items.right}
          callsign={flightInfo["identification.callsign"]}
          idx={2}
          isRightSide={true}
        />
      </div>
    </div>
  );
};

export default FlightList;
