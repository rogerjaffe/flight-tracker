import { useMemo } from "preact/hooks";
import { appStore } from "../../store.ts";
import InfoPanel from "./InfoPanel";
import MapTrack from "./MapTrack";
import FlightList from "./FlightList";
import useInterval from "../../hooks/useInterval.ts";
import MajorRegion from "../structure/MajorRegion.tsx";
import MainApp from "../structure/MainApp.tsx";
import AirlineLogo from "./FlightIcon/AirlineLogo.tsx";
import FlightIcao from "./FlightIcon/FlightIcao.tsx";
import AircraftCode from "./FlightIcon/AircraftCode.tsx";
import OriginDestination from "../structure/OriginDestination.tsx";
import OriginDestinationCity from "./OriginDestination/OriginDestinationCity.tsx";
import RightArrow from "./OriginDestination/RightArrow.tsx";
import OriginDestinationIata from "./OriginDestination/OriginDestinationIata.tsx";
import Placeholder from "../helpers/Placeholder.tsx";
import OriginDestinationDx from "./OriginDestination/OriginDestinationDx.tsx";
import ProgressBar from "./ProgressBar.tsx";
import { FlightInfoProvider } from "../providers/FlightInfoProvider";
import "./App.css";

export function App() {
  const switchDisplay = () => {
    if (appStore.displayRotate.value) {
      appStore.displayContent.value =
        appStore.displayContent.value === "flight" ? "map" : "flight";
    }
  };

  useInterval(switchDisplay, appStore.displayRotateInterval.value);

  const allFlightsContent = useMemo(() => {
    if (appStore.displayContent.value === "flight") {
      return <FlightList />;
    } else if (appStore.displayContent.value === "map") {
      return <MapTrack />;
    }
  }, [appStore.displayContent.value]);

  return (
    <FlightInfoProvider>
      <MainApp height={600} width={1024} addlClasses="border ft-bg">
        {/* TOP LEFT */}
        <MajorRegion
          rowStart={1}
          rowEnd={8}
          colSpan={4}
          bgColor="ft-bg-major-region"
        >
          <AirlineLogo />
          <FlightIcao />
          <AircraftCode />
        </MajorRegion>

        {/* BOTTOM LEFT */}
        <MajorRegion
          rowStart={8}
          rowEnd={24}
          colSpan={18}
          bgColor="ft-bg-major-region"
        >
          {allFlightsContent}
        </MajorRegion>

        {/* TOP MIDDLE */}
        <MajorRegion
          rowStart={1}
          rowEnd={8}
          colSpan={14}
          bgColor="ft-bg-major-region"
        >
          {/* ORIGIN / DESTINATION IATA CODES */}
          <OriginDestination>
            <OriginDestinationIata isOrigin={true} />
            <RightArrow />
            <OriginDestinationIata isOrigin={false} />
          </OriginDestination>

          {/* CITIES */}
          <OriginDestination>
            <OriginDestinationCity isOrigin={true} />
            <Placeholder />
            <OriginDestinationCity isOrigin={false} />
          </OriginDestination>

          {/* DISTANCE */}
          <OriginDestination>
            <OriginDestinationDx isOrigin={true} />
            <Placeholder />
            <OriginDestinationDx isOrigin={false} />
          </OriginDestination>

          {/* PROGRESS BAR */}
          <ProgressBar />
        </MajorRegion>

        {/* TOP RIGHT */}
        <MajorRegion
          rowStart={1}
          rowEnd={24}
          colSpan={9}
          bgColor="ft-bg-major-region"
        >
          <InfoPanel />
        </MajorRegion>
      </MainApp>
    </FlightInfoProvider>
  );
}
