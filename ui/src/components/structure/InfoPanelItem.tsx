import type { ComponentChildren } from "preact";

const InfoPanelItem = ({ children }: { children: ComponentChildren }) => {
  return (
    <div class="flex justify-between border-b py-0.5 pl-1 pr-1">{children}</div>
  );
};

export default InfoPanelItem;
