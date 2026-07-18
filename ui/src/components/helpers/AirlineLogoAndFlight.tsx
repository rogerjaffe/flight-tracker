import fallbackImg from "../../assets/airplane.png";
import { Fragment } from "preact";
import { appStore } from "../../store.ts";
import type { FlightListItem } from "../../types/FlightList.ts";

const AirlineLogoAndFlight = ({ item }: { item: FlightListItem }) => {
  const config = appStore.config.value;

  const airlineLogoSmall =
    config?.app.airline_logo_url +
    item.callsign.substring(0, 3) +
    config?.app.airline_logo_url_ext;

  const justify = (str: string) => {
    const n = str.substring(3);
    const j = n.padStart(4, "0");
    const a = str.substring(0, 3);
    return `${a} ${j}`;
  };

  return (
    <Fragment>
      <img
        class="w-5 h-5"
        src={airlineLogoSmall}
        alt={item.callsign}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImg;
        }}
      />
      <span>{justify(item.callsign)}</span>
    </Fragment>
  );
};

export default AirlineLogoAndFlight;
