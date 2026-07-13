import type { WorkerResponse } from "../types/WorkerTypes.ts";

export const getDarkmode = async (ctx: DedicatedWorkerGlobalScope) => {
  // Get configuration
  try {
    const response = await fetch("http://localhost:8000/api/darkmode");
    const obj = await response.json();
    ctx.postMessage({ type: "DARKMODE", data: obj.darkmode } as WorkerResponse);
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
