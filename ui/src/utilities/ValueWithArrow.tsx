import { getArrow } from "./arrows.tsx";
import type { ArrowDirection, Direction } from "../types/Direction.ts";
import { Fragment } from "preact";

const ValueWithArrow = ({
  value,
  trend,
  direction,
  precede = false,
}: {
  value: number;
  trend: Direction;
  direction: ArrowDirection;
  precede?: boolean;
}) => {
  if (value !== undefined && !isNaN(value)) {
    const str = Math.round(value)?.toLocaleString() ?? "--";
    if (precede) {
      return (
        <Fragment>
          {getArrow(direction, trend, precede)}
          <span>{str}</span>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span>{str}</span>
          {getArrow(direction, trend, precede)}
        </Fragment>
      );
    }
  } else {
    return (
      <Fragment>
        <span>---</span>
      </Fragment>
    );
  }
};

export default ValueWithArrow;
