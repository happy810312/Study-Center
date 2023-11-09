import React, { useEffect, useState, useRef } from "react";
import {
  addDays,
  addHours,
  addMinutes,
  getTime,
  setHours,
  setMinutes,
  subDays,
} from "date-fns";
import { isBefore, isAfter, isEqual, isWithinInterval } from "date-fns";
import { eachDayOfInterval, eachMinuteOfInterval } from "date-fns";
import { getHours, getMinutes, getSeconds, getMilliseconds } from "date-fns";
import { format, set, differenceInMinutes } from "date-fns";

const TimePickerComponent = ({ label, onChange, selectedTime }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timePickerRef = useRef(null);
  // 建立一個後端的時間的state，用useEffect監測format time修改後，就更改後端的state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleInputFocus = (e) => {
    timePickerRef.current.classList.add("input-focus");
  };
  const handleInputBlur = (e) => {
    timePickerRef.current.classList.remove("input-focus");
  };
  const handleButtonBlur = (e) => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };
  const handleKeyDown = (e) => {
    // 如果用户输入了两位数字的小时，则自动跳过分部分
    if (e.target.selectionStart === 2 && e.target.selectionEnd === 2) {
      e.preventDefault();
      e.target.setSelectionRange(3, 4); // 将光标移到分部分
    }
  };
  const handleTimeChange = (newTime) => {
    onChange(newTime);
  };

  const hourOptions = Array.from({ length: 15 }, (_, i) => i + 8);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="time-picker" ref={timePickerRef}>
      <div className="time-picker_time">
        <label htmlFor="time-picker_title">{label}</label>
        <input
          id="timeSelect"
          type="text"
          value={format(selectedTime, "HH:mm")}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="time-picker_btn">
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
        <div className="time-dropdown">
          <div className="time-dropdown_wrapper">
            <div className="time-dropdown_digital-clock">
              <ul className="time-dropdown_digital-hours">
                {hourOptions.map((hour) => {
                  return (
                    <li
                      // 缺少disabled past
                      className={`time-dropdown_digital-hour ${
                        getHours(selectedTime) == hour ? "selected" : ""
                      }`}
                      key={hour}
                      data-value={hour}
                      onClick={() =>
                        handleTimeChange(setHours(selectedTime, hour))
                      }
                    >
                      {hour < 10 ? `0${hour}` : hour}{" "}
                    </li>
                  );
                })}
              </ul>
              <ul className="time-dropdown_digital-minutes">
                {minuteOptions.map((minute) => (
                  <li
                    className={`time-dropdown_digital-minute ${
                      getMinutes(selectedTime) == minute ? "selected" : ""
                    } `}
                    key={minute}
                    data-value={minute}
                    onClick={() =>
                      handleTimeChange(setMinutes(selectedTime, minute))
                    }
                  >
                    {minute < 10 ? `0${minute}` : minute}{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerComponent;
