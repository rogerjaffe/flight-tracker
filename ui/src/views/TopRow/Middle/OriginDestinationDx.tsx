import { useFlightInfo } from "../../../providers/FlightInfoProvider.tsx";
import { useMemo } from "preact/hooks";
import { calculateDistance } from "../../../utilities/calculateDistance.ts";

const OriginDestinationDx = ({ isOrigin }: { isOrigin: boolean }) => {
  const { flightInfo, realTime } = useFlightInfo();

  const dx = useMemo(() => {
    const odLat = isOrigin
      ? flightInfo["airport.origin.position.latitude"]
      : flightInfo["airport.destination.position.latitude"];
    const odLon = isOrigin
      ? flightInfo["airport.origin.position.longitude"]
      : flightInfo["airport.destination.position.longitude"];
    const lat = realTime.latLon[realTime.latLon.length - 1].lat;
    const lon = realTime.latLon[realTime.latLon.length - 1].lon;
    return calculateDistance(odLat, odLon, lat, lon, "mi");
  }, [flightInfo, realTime]);

  return (
    <div id="origin-dx">
      {dx ? dx.toLocaleString() : 0}
      {" mi"}
    </div>
  );
};

export default OriginDestinationDx;
