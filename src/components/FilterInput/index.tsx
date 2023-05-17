import { useContext } from "react";
import { HomeContext } from "../Home";

const FilterInput = () => {
  const { seeLastXDays, seeLastMonth } = useContext(HomeContext);
  return (
    <div>
      <button
        onClick={() => {
          seeLastXDays(1);
        }}
      >
        set 1 d
      </button>
      <button
        onClick={() => {
          seeLastXDays(7);
        }}
      >
        set 7 d
      </button>
      <button onClick={seeLastMonth}>set 1 m</button>
    </div>
  );
};

export default FilterInput;
