import type { Store } from "./store.ts";
import type { Fr24AircraftDetail } from "../types/Fr24AircraftDetail.ts";
import { flattenObject } from "../utilities/flattenObject.ts";
import type { Fr24FlightResponse } from "../types/Fr24FlightResponse.ts";
import type { Fr24FlightDetailFlat } from "../types/Fr24FlightDetailFlat.ts";
// import type { FlightRec } from "../types/FlightRec.ts";
// import { findInMap } from "./findInMap.ts";

export async function getNewFlight(store: Store) {
  const flight = store.findNextFlightToRetrieve();
  if (!flight) return;
  try {
    // Get the registration first
    const regRes = await fetch(`http://localhost:8000/api/reg`, {
      method: "POST",
      body: JSON.stringify({ hex_code: flight.hex }),
      headers: { "Content-Type": "application/json" },
    });
    const aircraft = (await regRes.json()) as Fr24AircraftDetail;
    const reg = aircraft.result.response.aircraft.data[0].registration;

    // Now get the active flight for that A/C registration
    const acRes = await fetch(`http://localhost:8000/api/flight`, {
      method: "POST",
      body: JSON.stringify({ reg }),
      headers: { "Content-Type": "application/json" },
    });
    const thisFlight = (await acRes.json()) as Fr24FlightResponse;
    const liveFlight = thisFlight.result.response.data.find(
      (f) => f.status.live,
    );

    // If there's no live flight, then ignore it
    if (!liveFlight) {
      store.ignoreThisFlight(flight.hex);
      return;
    }

    // Flatten the flight details and add it to the store
    const flatFlight = flattenObject(liveFlight) as Fr24FlightDetailFlat;
    store.addFlightDetail(flight.hex, flatFlight);
  } catch (err) {
    console.log("FlightRetrievalError");
    store.ignoreThisFlight(flight.hex);
    return;
  }
}
