import Left from "./Left";
// import Middle from "./Middle";
// import Right from "./Right";
// import { Fragment } from "preact";
import Middle from "./Middle";

const TopRow = () => {
  return (
    <div class="h-[30%] w-full flex flex-row gap-0 border-black border-b-2">
      {/* SECTION 1 (Takes up 1/8 -> 12.5% width of row 1) */}
      <Left />
      <Middle />
    </div>
  );
  // }
};

export default TopRow;
