import reducer from "../../../reducer.ts";

const RightArrow = () => {
  const nextViewClick = () => {
    reducer("NEXT_DISPLAY_MODE");
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
