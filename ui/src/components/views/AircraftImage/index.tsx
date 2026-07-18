import "leaflet/dist/leaflet.css";
import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";

export function AircraftImage() {
  const { flightInfo } = useFlightInfo();

  return (
    <div class="h-full w-full rounded-none overflow-y-auto relative flex justify-center pt-1 pb-1">
      <img
        src={flightInfo["aircraft.image.url"]}
        alt="AircraftImage"
        title={flightInfo["aircraft.image.copyright"]}
      />
    </div>
  );
}

export default AircraftImage;
