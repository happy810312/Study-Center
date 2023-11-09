import React, { useRef, useState } from "react";
import { addDays } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const MonthyBookingPage = () => {
  const periodPickerRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleInputFocus = (e) => {
    periodPickerRef.current.classList.add("input-focus");
  };
  const handleInputBlur = (e) => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };
  const handleButtonBlur = (e) => {
    periodPickerRef.current.classList.remove("input-focus");
  };
  const handleKeyDown = (e) => {
    // 如果用户输入了两位数字的小时，则自动跳过分部分
    if (e.target.selectionStart === 2 && e.target.selectionEnd === 2) {
      e.preventDefault();
      e.target.setSelectionRange(3, 4); // 将光标移到分部分
    }
  };
  const handleSelectPeriod = (e) => {
    console.log(e.target.getAttribute("data-value"));
    setSelectedPeriod(e.target.getAttribute("data-value"));
    console.log(selectedPeriod);
  };

  const periodOptions = ["Morning", "Afternoon", "Evening"];

  return (
    <>
      <section
        className="monthy-booking trigger-for-header-grey-light"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="monthy-booking_wrapper">
            <h2 className="monthy-booking-title">
              Let's start booking a seat.
            </h2>
            <h3 className="monthy-booking-subtitle">
              Choosing a day is not as good as seizing the day.
            </h3>
            <form className="monthy-booking_date-range-picker">
              <div className="period-picker" ref={periodPickerRef}>
                <div className="period-picker_period">
                  <label htmlFor="period-picker_title">Select Period</label>
                  <input
                    id="timeSelect"
                    type="text"
                    value={selectedPeriod}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="period-picker_btn">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    onFocus={handleInputFocus}
                    onBlur={() => {
                      handleButtonBlur();
                      handleInputBlur();
                    }}
                  >
                    <svg
                      className="time-picker_clockIcon"
                      width={"24px"}
                      height={"24px"}
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                    </svg>
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="period-picker_dropdown">
                    <ul className="period-picker_dropdown-menu">
                      {periodOptions.map((period, index) => {
                        return (
                          <li
                            className="period-picker_dropdown-list"
                            key={index}
                            data-value={period.toLowerCase()}
                            onClick={handleSelectPeriod}
                          >
                            {period}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  className="date-picker"
                  label="Start Date"
                  disablePast
                  showDaysOutsideCurrentMonth
                  value={new Date()}
                  onChange={(date) => {
                    console.log(date);
                  }}
                  format="yyyy/MM/dd"
                  formatDensity
                  PopperProps={{
                    sx: {
                      ".MuiPaper-root": {
                        padding: 200,
                        backgroundColor: "#172438",
                      },
                    },
                  }}
                />
                <DatePicker
                  className="date-picker"
                  label="End Date"
                  disablePast
                  showDaysOutsideCurrentMonth
                  value={new Date()}
                  onChange={(date) => {
                    console.log(date);
                  }}
                  format="yyyy/MM/dd"
                  formatDensity
                />
              </LocalizationProvider>
              <button
                type="button"
                className="monthy-booking-menu_navigation-search"
                onClick={() => {}}
              >
                Search
              </button>
              <div className="alert alert-danger">{`Selected Period : ${selectedPeriod}\nStart Date : ${selectedStartDate}\n End Date : ${selectedEndDate}`}</div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default MonthyBookingPage;
