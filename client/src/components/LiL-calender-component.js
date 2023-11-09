import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";

const CalenderComponent = ({ bookingCalenderDate, setBookingCalenderDate }) => {
  const [current, setCurrent] = useState(new Date());

  const firstDateOfMonth = startOfMonth(current);
  // 獲取firstDayOfMonth是星期幾，用這個天數來變成前面要留幾個空格
  const prevAdditionAmount = getDay(firstDateOfMonth);
  // 後面要留的空格數
  const afterAdditionAmount =
    (7 - getDay(startOfMonth(addMonths(current, 1)))) % 7;
  const daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nextMonth = () => {
    setCurrent(addMonths(current, 1));
  };
  const prevMonth = () => {
    setCurrent(subMonths(current, 1));
  };
  const handleDateSelected = (e) => {
    const selectedDate = new Date(e.currentTarget.getAttribute("data-date"));
    setBookingCalenderDate(selectedDate);
  };

  return (
    <div className="calender">
      <div className="calender_nav">
        <button onClick={prevMonth} className="calender_nav-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" />
          </svg>
        </button>
        <h2 className="calender_nav-date">{format(current, "MMM, yyyy")}</h2>
        <button onClick={nextMonth} className="calender_nav-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" />
          </svg>
        </button>
      </div>
      <div className="calender_calendar-grid">
        {daysName.map((dayName) => {
          return <div className="calender_calendar-day">{dayName}</div>;
        })}
        {/* _為不成俗的規定，代表不需要使用到的變數 */}
        {/* Array(dayOfWeek)得到[empty*5] => 只是空槽，需要賦值undefined */}
        {Array(prevAdditionAmount)
          .fill()
          .map((_, index) => (
            <div
              key={`empty${index}`}
              className="calender_calendar-date empty"
            ></div>
          ))}
        {eachDayOfInterval({
          start: startOfMonth(current),
          end: endOfMonth(current),
        }).map((date) => (
          <div
            onClick={handleDateSelected}
            key={date}
            className={`calender_calendar-date`}
            data-date={date}
          >
            <h3 className="calender_calendar-date-number active">
              {format(date, "d")}
            </h3>
          </div>
        ))}
        {Array(afterAdditionAmount)
          .fill()
          .map((_, index) => (
            <div
              key={`empty${index}`}
              className="calender_calendar-date empty"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default CalenderComponent;
