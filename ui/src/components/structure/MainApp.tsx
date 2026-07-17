import type { ComponentChildren } from "preact";

const MainApp = ({
  width,
  height,
  addlClasses = "",
  children,
}: {
  width: number;
  height: number;
  addlClasses?: string;
  children: ComponentChildren;
}) => {
  return (
    <div
      id="main-app"
      class={`grid gap-2 p-2 box-border overflow-hidden ${addlClasses}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        gridTemplateColumns: "repeat(24, minmax(0, 1fr))",
        gridTemplateRows: "repeat(20, minmax(0, 1fr))",
      }}
    >
      {children}
    </div>
  );
};

export default MainApp;
