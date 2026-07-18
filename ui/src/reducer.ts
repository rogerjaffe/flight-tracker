import { appStore } from "./store";
import type { DisplayContent } from "./types/AppState.ts";

type Actions = "SET_ALL_FLIGHTS_CONTENT" | "NEXT_DISPLAY_MODE";
type Payload = DisplayContent;

const reducer = (action: Actions, payload?: Payload) => {
  switch (action) {
    case "SET_ALL_FLIGHTS_CONTENT":
      appStore.displayContent.value = payload as DisplayContent;
      break;

    case "NEXT_DISPLAY_MODE":
      let newVal: DisplayContent = "map";
      if (appStore.displayContent.value === "flight") {
        newVal = "map";
      } else if (appStore.displayContent.value === "map") {
        newVal = "distance";
      } else if (appStore.displayContent.value === "distance") {
        newVal = "summary";
      } else if (appStore.displayContent.value === "summary") {
        newVal = "image";
      } else if (appStore.displayContent.value === "image") {
        newVal = "flight";
      }
      appStore.displayContent.value = newVal;
      break;

    default:
      break;
  }
};

export default reducer;
