import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import { Fragment } from "preact";
import Time from "../helpers/Time.tsx";

const ScheduledTimes = ({ showLate = false }: { showLate: boolean }) => {
  const { flightInfo } = useFlightInfo();
  const scheduledDep = flightInfo["time.scheduled.departure"];
  const originTz = flightInfo["airport.origin.timezone.name"];
  const scheduledArr = flightInfo["time.scheduled.arrival"];
  const destinationTz = flightInfo["airport.destination.timezone.name"];
  return (
    <Fragment>
      <Time time={scheduledDep} tz={originTz} showLate={showLate} />
      {" - "}
      <Time time={scheduledArr} tz={destinationTz} showLate={showLate} />
    </Fragment>
  );
};

export default ScheduledTimes;
