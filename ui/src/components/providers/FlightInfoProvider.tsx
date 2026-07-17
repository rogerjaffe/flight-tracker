import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import { dashboardStore } from "../../store.ts";
import type { Fr24FlightDetailFlat } from "../../types/Fr24FlightDetailFlat.ts";
import type { Config } from "../../types/Config.ts";
import type { RealTime } from "../../types/ADSB.ts";
import type { FlightListItem } from "../../types/FlightList.ts";
import { SplashScreen } from "../views/SplashScreen.tsx";

// 2. Define the context value shape (never contains null)
interface FlightInfoContextType {
  flightInfo: Fr24FlightDetailFlat;
  config: Config;
  realTime: RealTime;
  flightList: FlightListItem[];
}

// 3. Initialize context as undefined (will be overwritten by the Provider)
const FlightInfoContext = createContext<FlightInfoContextType | undefined>(
  undefined,
);

interface FlightInfoProviderProps {
  children: ComponentChildren;
}

export function FlightInfoProvider({ children }: FlightInfoProviderProps) {
  const flightInfo = dashboardStore.flightInfo.value;
  const config = dashboardStore.config.value;
  const realTime = dashboardStore.realTime.value;
  const flightList = dashboardStore.flightList.value;

  // 🔴 THE GUARD: If state is null, stop rendering children entirely.
  // This prevents child hooks from firing with null data.
  if (flightInfo === null || config === null || realTime === null) {
    return <SplashScreen />;
  }

  // At this point, "flightInfo" is guaranteed to be FlightInfoProfile, matching FlightInfoContextType
  const value: FlightInfoContextType = {
    flightInfo,
    config,
    realTime,
    flightList,
  };

  return (
    <FlightInfoContext.Provider value={value}>
      {children}
    </FlightInfoContext.Provider>
  );
}

// 4. The Strict Custom Hook
export function useFlightInfo(): FlightInfoContextType {
  const context = useContext(FlightInfoContext);

  // Guard against using the hook outside of the Provider wrapper
  if (context === undefined) {
    throw new Error("useFlightInfo must be used within a FlightInfoProvider");
  }

  return context;
}
