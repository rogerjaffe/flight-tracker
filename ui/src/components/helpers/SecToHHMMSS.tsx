function SecToHHMMSS({
  sec,
  withSec = true,
  withCompare = false,
  compareWith = 0,
}: {
  sec: number;
  withSec?: boolean;
  withCompare?: boolean;
  compareWith?: number;
}) {
  // Math.floor mimics Python's integer conversion for division
  const hr = Math.floor(sec / 3600);
  const hrStr = hr > 0 ? `${hr}h` : "";

  let compareClass = "";
  if (withCompare && sec > compareWith) compareClass = "ft-text-late";
  if (withCompare && sec < compareWith) compareClass = "ft-text-early";

  const min = Math.floor((sec - hr * 3600) / 60);
  let minStr = "";

  if (hr > 0) {
    // Adds a leading zero if minutes are under 10
    minStr = `${min}`.padStart(2, "0") + "m";
  } else {
    minStr = `${min}m`;
  }

  let str = "";
  if (!withSec) {
    str = `${hrStr} ${minStr}`.trim();
  } else {
    const remainingSec = Math.floor(sec % 60);
    const secStr = `${remainingSec}`.padStart(2, "0") + "s";

    // Returns the formatted layout string with trimmed spacing
    str = `${hrStr} ${minStr} ${secStr}`.trim();
  }
  return <span class={compareClass}>{str}</span>;
}

export default SecToHHMMSS;
