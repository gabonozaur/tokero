import { useContext } from "react";
import DatePicker from "react-multi-date-picker";
import { HomeContext } from "../Home";

const FilterInput = () => {
  const {
    seeLastXDays,
    seeLastMonth,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useContext(HomeContext);

  const maxDate = new Date();

  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 2);

  return (
    <div>
      <div style={{ display: "flex" }}>
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

      <DatePicker
        value={[startDate, endDate]}
        range
        rangeHover
        minDate={minDate.toISOString()}
        maxDate={maxDate.toISOString()}
        onChange={(dateObjects) => {
          if (dateObjects[1]) {
            setStartDate(new Date(dateObjects[0]).toISOString());
            setEndDate(new Date(dateObjects[1]).toISOString());
          }
        }}
      />
    </div>
  );
};

export default FilterInput;
