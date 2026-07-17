import fallbackImg from "../../../../assets/airplane.png";
import { useFlightInfo } from "../../../providers/FlightInfoProvider.tsx";

const AirlineLogo = () => {
  const { flightInfo, config } = useFlightInfo();
  const url = config.app.airline_logo_url ?? "";
  const ext = config.app.airline_logo_url_ext ?? "";
  const icao = flightInfo["identification.callsign"]?.substring(0, 3) ?? "UNK";
  return (
    <img
      id="airline-logo"
      src={`${url}${flightInfo["owner.code.icao"] ?? icao}${ext}`}
      alt="AirlineIcon"
      className="airline-logo p-2 mb-2 mt-2"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallbackImg;
      }}
    />
  );
};

export default AirlineLogo;
