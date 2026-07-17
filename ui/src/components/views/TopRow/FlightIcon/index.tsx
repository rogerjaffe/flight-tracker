import AirlineLogo from "./AirlineLogo.tsx";
import FlightIcao from "./FlightIcao.tsx";
import AircraftCode from "./AircraftCode.tsx";

const Left = () => {
  return (
    <>
      {/*<div class="w-full h-full flex flex-col gap-3 border-r">*/}
      <AirlineLogo />
      <FlightIcao />
      <AircraftCode />
    </>
    // </div>
  );
};

export default Left;
