import React, { useRef, useState } from "react";
import { ArrowDropDownIcon, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { isBefore, parseISO } from "date-fns";

import SeatService from "../services/seats-service";

const MonthyBookingPage = () => {
  const periodPickerRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleInputFocus = () => {
    periodPickerRef.current.classList.add("input-focus");
  };
  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };
  const handleButtonBlur = () => {
    periodPickerRef.current.classList.remove("input-focus");
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
  };
  const handleSelectPeriod = (e) => {
    setSelectedPeriod(e.target.getAttribute("data-value"));
  };

  const handleSearchBtn = () => {
    function formatDateToISO(dateString) {
      const date = new Date(dateString);
      return date.toISOString();
    }

    const startDateISO = formatDateToISO(selectedStartDate);
    const endDateISO = formatDateToISO(selectedEndDate);

    if (isBefore(parseISO(endDateISO), parseISO(startDateISO))) {
      return setMessage({
        message: "Start date must be earlier than end date.",
      });
    }

    SeatService.getUnAvaliableSeatsByPeriod(
      startDateISO,
      endDateISO,
      selectedPeriod
    )
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
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
            {message && (
              <div className="alert alert-danger">{message.message}</div>
            )}
            <div className="alert alert-danger">{`Selected Period : ${selectedPeriod}\nStart Date : ${selectedStartDate}\n End Date : ${selectedEndDate}`}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form className="monthy-booking_date-range-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="date-picker"
                    label="Start Date"
                    disablePast
                    showDaysOutsideCurrentMonth
                    value={selectedStartDate}
                    onChange={(date) => {
                      setSelectedStartDate(date);
                    }}
                    format="yyyy/MM/dd"
                    formatDensity
                  />
                  <DatePicker
                    className="date-picker"
                    label="End Date"
                    disablePast
                    showDaysOutsideCurrentMonth
                    value={selectedEndDate}
                    onChange={(date) => {
                      setSelectedEndDate(date);
                    }}
                    format="yyyy/MM/dd"
                    formatDensity
                  />
                </LocalizationProvider>
                <div className="period-picker" ref={periodPickerRef}>
                  <div className="period-picker_period">
                    <label
                      htmlFor="period-picker_title"
                      style={
                        selectedPeriod
                          ? {
                              top: "-8px",
                              transform: "translateY(0)",
                              fontSize: "0.75rem",
                            }
                          : {}
                      }
                    >
                      Select Period
                    </label>
                    <input
                      id="timeSelect"
                      type="text"
                      value={selectedPeriod}
                      onFocus={handleInputFocus}
                      onBlur={() => {
                        handleButtonBlur();
                      }}
                      readOnly
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
                      <ArrowDropDownIcon />
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
                <button
                  onClick={handleSearchBtn}
                  type="button"
                  className="monthy-booking-menu_navigation-search"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MonthyBookingPage;
