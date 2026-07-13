import type { WorkerResponse } from "../types/WorkerTypes.ts";
import type { Store } from "./store.ts";

export const getConfig = async (
  ctx: DedicatedWorkerGlobalScope,
  store: Store,
) => {
  // Get configuration
  try {
    const configRes = await fetch("http://localhost:8000/api/config");
    const config = await configRes.json();
    store.setConfig(config);
    ctx.postMessage({ type: "CONFIG", data: config } as WorkerResponse);
    return { error: false };
  } catch (err) {
    ctx.postMessage({
      type: "ERROR",
      error: "Failed to fetch configuration",
      origin: "CONFIG",
    } as WorkerResponse);
    return { error: true };
  }
};
