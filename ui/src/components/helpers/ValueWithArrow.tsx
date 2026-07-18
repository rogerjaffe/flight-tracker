import { getArrow } from "../../utilities/arrows.tsx";
import type { ArrowDirection, Direction } from "../../types/Direction.ts";

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
  const str =
    value !== undefined && !isNaN(value)
      ? Math.round(value)?.toLocaleString()
      : "UNK";
  const strHTML = <span>{str}</span>;
  const arrow = getArrow(direction, trend);
  const arrowHTML = (
    <span
      class={`${direction ? "ft-" + direction : ""} ${trend ? "ft-" + trend : ""} direction-arrow`}
    >
      {arrow}
    </span>
  );
  if (precede) {
    return (
      <span class="pl-1">
        {arrowHTML}
        {strHTML}
      </span>
    );
  } else {
    return (
      <span class="pr-1">
        {strHTML}
        {arrowHTML}
      </span>
    );
  }
};

export default ValueWithArrow;
