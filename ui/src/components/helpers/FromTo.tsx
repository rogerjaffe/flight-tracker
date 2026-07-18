import { ARROWS } from "../../utilities/arrows.tsx";
import type { FlightListItem } from "../../types/FlightList.ts";
import { Fragment } from "preact";

const FromTo = ({ item }: { item: FlightListItem }) => {
  return (
    <Fragment>
      <span>{item.origin ? item.origin : "---"}</span>
      <span
        class="pl-2 pr-2"
        style={{
          width: "25px",
          display: "inline-block",
          verticalAlign: "middle",
          transform: "translateY(-10%)",
        }}
      >
        {ARROWS.right}
      </span>
      <span>{item.destination ? item.destination : "---"}</span>
    </Fragment>
  );
};

export default FromTo;
