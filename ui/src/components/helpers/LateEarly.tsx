import { useFlightInfo } from "../providers/FlightInfoProvider.tsx";
import SecToHHMMSS from "./SecToHHMMSS.tsx";

const LateEarly = () => {
  const { flightInfo } = useFlightInfo();
  const scheduledDep = flightInfo["time.scheduled.departure"];
  const scheduledArr = flightInfo["time.scheduled.arrival"];
  const actualDep = flightInfo["time.real.departure"];
  const estArr = flightInfo["time.estimated.arrival"];
  if (!scheduledDep || !scheduledArr || !actualDep || !estArr)
    return "Not available";

  const depVariant = actualDep - scheduledDep;
  const arrVariant = estArr - scheduledArr;
  const depStr = SecToHHMMSS({ sec: Math.abs(depVariant), withSec: false });
  const depIsLateClass =
    depVariant > 0 ? "text-red-500" : depVariant < 0 ? "text-green-500" : "";
  const arrStr = SecToHHMMSS({ sec: Math.abs(arrVariant), withSec: false });
  const arrIsLateClass =
    arrVariant > 0 ? "text-red-500" : arrVariant < 0 ? "text-green-500" : "";
  return (
    <div className="flex gap-2">
      <div className={`${depIsLateClass}`}>{depStr}</div>
      {" - "}
      <div className={`${arrIsLateClass}`}>{arrStr}</div>
    </div>
  );
};

export default LateEarly;
