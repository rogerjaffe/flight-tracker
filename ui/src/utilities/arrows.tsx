import type { ArrowDirection, Direction } from "../types/Direction.ts";

export const ARROWS = { up: "▲", right: "▶", down: "▼", left: "◀" };

export const getArrow = (arrowDirection: ArrowDirection, trend: Direction) => {
  if (arrowDirection === "up-down") {
    if (trend === "inc") {
      return ARROWS.up;
    } else if (trend === "dec") {
      return ARROWS.down;
    } else {
      return "";
    }
  } else if (arrowDirection === "left-right") {
    if (trend === "inc") {
      return ARROWS.right;
    } else if (trend === "dec") {
      return ARROWS.left;
    } else {
      return "";
    }
  }
};
