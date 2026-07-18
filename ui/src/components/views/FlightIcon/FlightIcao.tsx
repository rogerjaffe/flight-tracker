import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";

const FlightIcao = () => {
  const { flightInfo } = useFlightInfo();
  return (
    <div id="icao-flight" className="text-xl text-center font-bold">
      {flightInfo["identification.callsign"] ?? ""}
    </div>
  );
};

export default FlightIcao;
