const earlyOrLate = (time: number, compareTo: number) =>
  time < compareTo ? "ft-text-early" : "ft-text-late";

export default earlyOrLate;
