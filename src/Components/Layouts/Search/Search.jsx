import React, { useState } from "react";
import "./search.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
export default function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelection = (ranges) => {
    setStartDate(() => ranges.selection.startDate);
    setEndDate(() => ranges.selection.endDate);
  };
  return (
    <div className="search">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelection}
      ></DateRangePicker>
      <div className="footer">
        <h2>
          Number of guests <i className="material-icons">groups</i>
        </h2>
        <input min={0} defaultValue={2} type="number"></input>
        <button>Search AirBnB</button>
      </div>
    </div>
  );
}
