import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";

const Summary = () => {
  const { flightList } = useFlightInfo();
  const airlines = flightList.reduce(
    (acc, item) => {
      const airline = item.callsign.substring(0, 3);
      acc[airline] = (acc[airline] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const origin = flightList.reduce(
    (acc, item) => {
      if (item.origin && item.originCity) {
        const origin = `${item.origin} ${item.originCity}`;
        if (origin) {
          acc[origin] = (acc[origin] || 0) + 1;
        }
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const dest = flightList.reduce(
    (acc, item) => {
      if (item.destination && item.destinationCity) {
        const dest = `${item.destination} ${item.destinationCity}`;
        if (dest) {
          acc[dest] = (acc[dest] || 0) + 1;
        }
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const airlineKeys = Object.keys(airlines).toSorted((a, b) =>
    a.localeCompare(b),
  );
  const originKeys = Object.keys(origin).toSorted((a, b) => a.localeCompare(b));
  const destKeys = Object.keys(dest).toSorted((a, b) => a.localeCompare(b));

  const maxRow = Math.max(
    airlineKeys.length,
    originKeys.length,
    destKeys.length,
  );

  const carrier = Array.from({ length: maxRow }, (_, index) => index);

  const decode = (
    obj: Record<string, number>,
    keys: string[],
    idx: number,
    isVal: boolean,
    extraClass?: string,
  ) => {
    if (idx >= keys.length) {
      return <td class={isVal ? "border-r border-b" : "border-b"}>&nbsp;</td>;
    } else {
      if (isVal) {
        return (
          <td class={`text-center border-r border-b ${extraClass ?? ""}`}>
            {obj[keys[idx]]}
          </td>
        );
      } else {
        return (
          <td class={`text-center border-b pl-2 ${extraClass ?? ""}`}>
            {keys[idx]}
          </td>
        );
      }
    }
  };
  return (
    <div class="grid grid-cols-[1fr] gap-0 h-full min-h-0">
      <div class="min-h-0 overflow-y-auto relative">
        <table class="w-full text-left tabular-nums text-[14px] border-separate border-spacing-0 table-fixed">
          <thead class="sticky top-0 z-20 ft-bg-flight-list-header shadow-sm">
            <tr class="h-0">
              <th class="w-[15%] p-0 h-0"></th> {/* Airline Name */}
              <th class="w-[5%] p-0 h-0"></th> <th class="w-[35%] p-0 h-0"></th>{" "}
              {/* Origin Name */}
              <th class="w-[5%] p-0 h-0"></th> {/* Origin Count */}
              <th class="w-[35%] p-0 h-0"></th> {/* Destination Name */}
              <th class="w-[5%] p-0 h-0"></th> {/* Destination Count */}
            </tr>
            <tr class="text-base font-bold rounded-2xl">
              <th colSpan={2} class="text-center pt-1 pb-1 border-b-2 border-r">
                Airlines {`(${airlineKeys.length} items)`}
              </th>
              <th colSpan={2} class="text-center pt-1 pb-1 border-b-2 border-r">
                Origins {`(${originKeys.length} items)`}
              </th>
              <th colSpan={2} class="text-center pt-1 pb-1 border-b-2 border-r">
                Destinations {`(${destKeys.length} items)`}
              </th>
            </tr>
          </thead>

          {/* DATA CONTAINER PORT */}
          <tbody class="divide-y">
            {carrier.map((_, idx) => {
              return (
                <tr
                  key={`summary-${idx}`}
                  class="transition-colors cursor-pointer"
                >
                  {decode(airlines, airlineKeys, idx, false)}
                  {decode(airlines, airlineKeys, idx, true)}
                  {decode(origin, originKeys, idx, false, "text-left")}
                  {decode(origin, originKeys, idx, true)}
                  {decode(dest, destKeys, idx, false, "text-left")}
                  {decode(dest, destKeys, idx, true)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
