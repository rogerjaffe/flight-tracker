import { formatTime } from "../../utilities/formatTime.ts";

const Time = ({
  time,
  tz,
  showLate = false,
  compareWith = 0,
}: {
  time: number;
  tz: string;
  showLate: boolean;
  compareWith?: number;
}) => {
  const timeStr = formatTime(time, tz);
  const isLate = showLate && time > compareWith;
  const isEarly = showLate && time < compareWith;
  let statusClass = "";
  if (isLate) {
    statusClass = "text-red-500";
  } else if (isEarly) {
    statusClass = "text-green-500";
  }
  return <span class={statusClass}>{timeStr}</span>;
};

export default Time;
