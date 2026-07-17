import { useMemo } from "preact/hooks";
import { useFlightInfo } from "../../../providers/FlightInfoProvider.tsx";

const OriginDestinationIata = ({ isOrigin }: { isOrigin: boolean }) => {
  const { flightInfo } = useFlightInfo();

  const code = useMemo(() => {
    if (isOrigin) {
      return flightInfo["airport.origin.code.iata"] ?? "---";
    } else {
      return flightInfo["airport.destination.code.iata"] ?? "---";
    }
  }, [isOrigin, flightInfo]);

  return (
    <div
      id={`${isOrigin ? "origin" : "destination"}-iata`}
      className="text-8xl font-bold text-center"
    >
      {code}
    </div>
  );
};

export default OriginDestinationIata;
