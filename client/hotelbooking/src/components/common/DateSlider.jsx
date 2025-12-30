import { useState } from "react";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    setDateRange(ranges.selection);

    // Call filter only once
    onDateChange(startDate, endDate);
    onFilterChange(startDate, endDate);
  };

  const handleClearFilter = () => {
    const cleared = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };

    setDateRange(cleared);

    onDateChange(null, null);
    onFilterChange(null, null);
  };

  return (
    <>
      <h5>Filter bookings by date</h5>

      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className="mb-4"
      />

      <button className="btn btn-secondary" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </>
  );
};

DateSlider.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default DateSlider;
