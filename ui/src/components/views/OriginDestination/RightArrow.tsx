import { appStore } from "../../../store.ts";

const RightArrow = () => {
  const displayContent = appStore.displayContent;

  const nextViewClick = () => {
    if (displayContent.value === "flight") {
      displayContent.value = "map";
    } else if (displayContent.value === "map") {
      displayContent.value = "flight";
    }
  };

  return (
    <div
      class="flex items-center justify-center text-5xl font-bold cursor-pointer mt-5 "
      onClick={nextViewClick}
    >
      ▶
    </div>
  );
};

export default RightArrow;
