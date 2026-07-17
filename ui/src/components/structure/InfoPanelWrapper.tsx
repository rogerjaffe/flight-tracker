import type { ComponentChildren } from "preact";

const InfoPanelWrapper = ({ children }: { children: ComponentChildren }) => {
  return (
    <div class="flex-1 pb-3 flex flex-col justify-start font-sans rounded-none overflow-y-auto">
      {children}
    </div>
  );
};

export default InfoPanelWrapper;
