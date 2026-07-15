import { useEffect } from "preact/hooks";
import { App } from "./App";
import { dashboardStore, appStore } from "../store";
import type { WorkerResponse, WorkerRequest } from "../types/WorkerTypes";

export function WorkerInterface() {
  useEffect(() => {
    // Vite automatically compiles and splits this module asset using worker paths
    const worker = new Worker(
      new URL("../worker/apiWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );

    appStore.worker.value = worker;
    appStore.isLoading.value = true;

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const response = event.data;
      console.log("UI", response);
      appStore.isLoading.value = false;

      if (response.type === "CONFIG") {
        appStore.config.value = response.data;
        dashboardStore.config.value = response.data;
      } else if (response.type === "FLIGHT_LIST") {
        dashboardStore.flightList.value = response.data;
      } else if (response.type === "FLIGHT_TO_DISPLAY") {
        if (response.data) {
          dashboardStore.realTime.value = response.data.realTime;
          dashboardStore.flightInfo.value = response.data.flightInfo;
        }
      } else if (response.type === "DARKMODE") {
        appStore.darkmode.value = response.data;
      } else if (response.type === "ERROR") {
        appStore.errorMessage.value = `Data Stream Interrupted: ${response.error}`;
      }
    };

    const startCmd: WorkerRequest = { action: "start" };
    worker.postMessage(startCmd);

    return () => worker.terminate();
  }, []);

  return <App />;
}
