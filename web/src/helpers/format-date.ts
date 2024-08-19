import { intervalToDuration } from "date-fns";

interface IntervalDateProps {
  start: Date;
  end: Date;
}

export function intervalDate({ end, start }: IntervalDateProps) {
  return intervalToDuration({ start, end, });
}