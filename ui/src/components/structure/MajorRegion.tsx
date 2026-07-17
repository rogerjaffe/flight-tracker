import type { ComponentChildren } from "preact";

const MajorRegion = ({
  rowStart,
  rowEnd,
  colSpan,
  children,
  bgColor = "bg-gray-200",
}: {
  rowStart: number;
  rowEnd: number;
  colSpan: number;
  bgColor?: string;
  children: ComponentChildren;
}) => {
  return (
    <div
      class={`rounded-xl ${bgColor} shadow-xl overflow-hidden min-w-0`}
      style={{
        gridRow: `${rowStart} / ${rowEnd}`,
        gridColumn: `span ${colSpan} / span ${colSpan}`,
      }}
    >
      <div class="h-full w-full">{children}</div>
    </div>
  );
};

export default MajorRegion;
