import { FlightInfoProvider } from "../providers/FlightInfoProvider";
import InfoPanel from "./InfoPanel";
import TopRow from "./TopRow";
import "./App.css";
import MapTrack from "./MapTrack";
import {appStore} from "../store.ts";
import FlightList from "./FlightList";

export function App() {
  const displayContent = appStore.displayContent.value
  return (
    <FlightInfoProvider>
      <div class="w-[1024px] h-[600px] dark:text-white select-none p-0 box-border flex flex-col overflow-hidden border-black dark:border-white border-1">
        {/* FULL CANVAS: Splitting Left Content (6/8 or 75% width) and Right Section 3 (2/8 or 25% width) */}
        <div class="w-full h-full flex flex-row gap-0">
          {/* LEFT CONTAINER (Sections 1 & 2 + Row 2) */}
          <div class="w-[75%] h-full flex flex-col gap-0">
            {/* ROW 1 (Takes up 2/5 -> 40% height of full layout) */}
            <TopRow />
            {/* ROW 2 (Takes up 3/5 -> 60% height of full layout) */}
            {
              displayContent === "flight" ? <FlightList /> : null
            }
            {
              displayContent === 'map' ? <MapTrack /> : null
            }
          </div>
          <InfoPanel />
        </div>
      </div>
    </FlightInfoProvider>
  );
}
