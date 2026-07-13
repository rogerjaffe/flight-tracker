import type { ADSBServer } from "../types/Config.ts";
import type { Store } from "./store.ts";
import type { WorkerResponse } from "../types/WorkerTypes.ts";
import type { ADSBRaw } from "../types/ADSB.ts";

export class ADSBPoller {
  server: ADSBServer;
  store: Store;
  ctx: DedicatedWorkerGlobalScope;
  proxy: string;

  constructor(
    server: ADSBServer,
    store: Store,
    ctx: DedicatedWorkerGlobalScope,
    proxy: string,
  ) {
    this.server = server as ADSBServer;
    this.store = store;
    this.proxy = proxy;
    this.ctx = ctx;
    this.poll = this.poll.bind(this);
  }

  startPolling() {
    if (!this.server.is_enabled) return;
    setInterval(async () => {
      await this.poll();
    }, this.server.interval * 1000);
    console.log(`Starting polling for server: ${this.server.name}`);
  }

  async poll() {
    try {
      const res = await fetch(this.proxy, {
        method: "POST",
        body: JSON.stringify({ url: this.server.url }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const rawData = await res.json();

      const data = rawData[this.server.data_path] as ADSBRaw[];
      if (data) {
        this.store.addAdsbList(data);
        return data ?? [];
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown network error";
      this.ctx.postMessage({
        type: "ERROR",
        error: errorMessage,
        origin: "ADSB",
      } as WorkerResponse);
    }
  }
}
