import type { ArrowDirection, Direction } from "../types/Direction.ts";

export const ARROWS = { up: "▲", right: "▶", down: "▼", left: "◀" };

export const getArrow = (
  arrowDirection: ArrowDirection,
  trend: Direction,
  precede: boolean = false,
) => {
  const pad = precede ? "pr-1" : "pl-1";
  if (arrowDirection === "up-down") {
    if (trend === "inc") {
      return (
        <span class={`inline-flex items-center justify-center ${pad} ${trend}`}>
          {ARROWS.up}
        </span>
      );
    } else if (trend === "dec") {
      return (
        <span class={`inline-flex items-center justify-center ${pad} ${trend}`}>
          {ARROWS.down}
        </span>
      );
    } else {
      return (
        <span class={`inline-flex items-center justify-center ${pad} ${trend}`}>
          &nbsp;
        </span>
      );
    }
  } else if (arrowDirection === "left-right") {
    if (trend === "inc") {
      return (
        <span class={`inline-flex items-center justify-center ${pad} ${trend}`}>
          {ARROWS.right}
        </span>
      );
    } else if (trend === "dec") {
      return (
        <span
          class={`inline-flex items-center justify-center ${pad} ${trend}`}
          style={{ width: "15px" }}
        >
          {ARROWS.left}
        </span>
      );
    } else {
      return (
        <span
          class={`inline-flex items-center justify-center ${pad} ${trend}`}
          style={{ width: "15px" }}
        >
          &nbsp;
        </span>
      );
    }
  }
};
