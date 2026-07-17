import type { ComponentChildren } from "preact";

const OriginDestination = ({ children }: { children: ComponentChildren }) => {
  return <div class="grid grid-cols-[2fr_1fr_2fr] gap-1">{children}</div>;
};

export default OriginDestination;
