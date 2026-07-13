import type { WorkerRequest } from "../types/WorkerTypes";
import { Store } from "./store";
import { getConfig } from "./getConfig.ts";
import { ADSBPoller } from "./ADSBPoller.ts";
import type { ADSBServer } from "../types/Config.ts";
import { cleanup } from "./cleanup.ts";
import { getNewFlight } from "./getNewFlight.ts";
import { getDarkmode } from "./getDarkmode.ts";

const ctx: DedicatedWorkerGlobalScope = self as any;
const store = new Store();

ctx.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  if (e.data.action === "get_this_flight") {
    const hex = e.data.hex;
    if (!hex) return;
    store.addSuspend();
    const flight = store.getThisFlight(hex.toLowerCase());
    ctx.postMessage({ type: "FLIGHT_TO_DISPLAY", data: flight });
  }

  if (e.data.action === "start") {
    const configResponse = await getConfig(ctx, store);
    const config = store.getState().config;
    if (configResponse.error) {
      return; // Just quit if no configuration found
    }

    const adsbServers = store.getState().config?.adsb_servers as ADSBServer[];
    adsbServers.map((server) => {
      const p = new ADSBPoller(server, store, ctx, config?.app.proxy ?? "");
      p.startPolling();
      return p;
    });

    // Clean up loop - remove hex codes, ADSBs unused
    setInterval(
      () => {
        cleanup(store);
      },
      (config?.app.clean_interval ?? 30) * 1000,
    );

    setInterval(
      () => {
        getNewFlight(store);
      },
      (config?.app.get_flight_list_interval ?? 5) * 1000,
    );

    setInterval(
      () => {
        if (store.shouldSuspend()) return;
        const flight = store.getNextFlightToDisplay();
        ctx.postMessage({ type: "FLIGHT_TO_DISPLAY", data: flight });
      },
      (config?.app.display_new_flight_interval ?? 12) * 1000,
    );

    setInterval(
      () => {
        const flightList = store.getFlightList();
        ctx.postMessage({ type: "FLIGHT_LIST", data: flightList });
      },
      (config?.app.refresh_flight_list_interval ?? 2) * 1000,
    );
    ``;
    setInterval(
      () => {
        getDarkmode(ctx);
      },
      // 5000,
      (config?.app.get_dark_mode_interval ?? 60) * 60 * 1000,
    );
  }
};
