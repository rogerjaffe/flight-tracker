import { useFlightInfo } from "../../../providers/FlightInfoProvider.tsx";

const AircraftCode = () => {
  const { flightInfo } = useFlightInfo();
  return (
    <div id="icao-flight" className="text-sm text-center">
      {flightInfo["aircraft.model.code"] ?? ""}
    </div>
  );
};

export default AircraftCode;
