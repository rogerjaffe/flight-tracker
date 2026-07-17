import { useFlightInfo } from "../../providers/FlightInfoProvider.tsx";
import { Fragment } from "preact";
import Time from "../../helpers/Time.tsx";

const EstimatedTimes = ({ showLate = false }: { showLate: boolean }) => {
  const { flightInfo } = useFlightInfo();
  const scheduledDep = flightInfo["time.scheduled.departure"];
  const scheduledArr = flightInfo["time.scheduled.arrival"];
  const actualDep = flightInfo["time.real.departure"];
  const estArr = flightInfo["time.estimated.arrival"];
  const originTz = flightInfo["airport.origin.timezone.name"];
  const destinationTz = flightInfo["airport.destination.timezone.name"];
  return (
    <Fragment>
      {!scheduledDep || !scheduledArr ? (
        "N/A"
      ) : (
        <Time
          time={actualDep}
          tz={originTz}
          showLate={showLate}
          compareWith={scheduledDep}
        />
      )}
      {" - "}
      {!actualDep || !estArr ? (
        "N/A"
      ) : (
        <Time
          time={estArr}
          tz={destinationTz}
          showLate={showLate}
          compareWith={scheduledArr}
        />
      )}
    </Fragment>
  );
};

export default EstimatedTimes;
