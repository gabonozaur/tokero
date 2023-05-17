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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "gred",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
        }}
      >
        <button
          onClick={() => {
            seeLastXDays(1);
          }}
        >
          daily
        </button>
        <button
          onClick={() => {
            seeLastXDays(7);
          }}
        >
          weekly
        </button>
        <button onClick={seeLastMonth}>monthly</button>
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
