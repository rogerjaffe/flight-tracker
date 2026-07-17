import { useMemo } from "preact/hooks";
import { useFlightInfo } from "../../../providers/FlightInfoProvider.tsx";

const OriginDestinationCity = ({ isOrigin }: { isOrigin: boolean }) => {
  const { flightInfo } = useFlightInfo();

  const city = useMemo(() => {
    if (isOrigin) {
      return flightInfo["airport.origin.position.region.city"] ?? "---";
    } else {
      return flightInfo["airport.destination.position.region.city"] ?? "---";
    }
  }, [isOrigin, flightInfo]);

  return (
    <div
      id={`${isOrigin ? "origin" : "destination"}-city`}
      className="text-2xl text-center"
    >
      {city}
    </div>
  );
};

export default OriginDestinationCity;
