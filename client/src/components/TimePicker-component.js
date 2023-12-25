import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { set, setHours, setMinutes, getHours, getMinutes } from "date-fns";
import { format } from "date-fns";
import { ClockIcon, ArrowDownIcon, ArrowUpIcon, TickIcon } from "./icons";

const TimePickerComponent = ({
  id,
  label,
  onChange,
  selectedTime,
  hourDisabled,
  minuteDisabled,
}) => {
  // styled component
  const DropDownWrapper = styled.div`
    position: absolute;
    z-index: 100;
    top: 110%;
    right: 0;
    min-width: 164px;
    border: 1px solid grey;
    border-radius: 4px;
    box-shadow: 0 0 10px #f5f6f6;
  `;
  const DropDownTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #f5f6f6;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0.5rem 1rem;
  `;
  const DropDownTitle = styled.div`
    font-weight: 600;
    line-height: 1.2;
  `;
  const DropDownCancelBtn = styled.button`
    position: relative;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-radius: 50%;
    border-color: transparent;
    margin-left: 2rem;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0%;
      width: 20px;
      height: 2px;
      background-color: black;
      opacity: 0.7;
      transform: rotate(45deg) translateY(-30%);
    }
    &::after {
      transform: rotate(-45deg);
    }
    &:hover {
      opacity: 0.5;
    }
  `;
  const DropDownPickerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 0.5rem 1rem;
  `;
  const DropDownPickerTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
  const DropDownFootWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    background-color: #f5f6f6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0.5rem 1rem;
  `;
  // general
  const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-color: transparent;
    &:hover {
      opacity: 0.5;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:active {
        background-color: red;
      }
    }
  `;
  const Span = styled.span`
    display: block;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.2;
    margin: 0 1rem;
  `;
  const Input = styled.input`
    width: 40px;
    border: none;
    text-align: center;
    ling-height: 1.5;
    padding: 0.5rem;
    &:focus {
      border-radius: 0.5rem;
      box-shadow: 0 0 5px #3367d1;
    }
    &:disabled {
      cursor: not-allowed;
      &:active {
        background-color: red;
      }
    }
  `;

  // -------------------state-------------------
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let [[hour, minute], setter] = useState([
    getHours(selectedTime),
    getMinutes(selectedTime),
  ]);
  const timePickerRef = useRef(null);
  // 建立一個後端的時間的state，用useEffect監測format time修改後，就更改後端的state

  const toggleDropdown = () => {
    setIsDropdownOpen((prevDropdownState) => !prevDropdownState);
  };
  const handleInputFocus = () => {
    timePickerRef.current.classList.add("input-focus");
  };
  const handleInputBlur = () => {
    timePickerRef.current.classList.remove("input-focus");
  };
  const handleDropDownBlur = () => {
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

  const dropDownListRef = useRef(null);
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (
        isDropdownOpen === true &&
        dropDownListRef.current &&
        !dropDownListRef.current.contains(e.target) // e.target是用戶在dropDownListRef上點擊的元素
      ) {
        // 用戶點擊time picker 下拉選單外執行
        handleDropDownBlur();
        handleInputBlur();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDropdownOpen]); // isDropdownOpen改成true的時候掛監聽器
  useEffect(() => {
    setter([getHours(selectedTime), getMinutes(selectedTime)]);
  }, [selectedTime]);

  return (
    <div className="time-picker" ref={timePickerRef}>
      <div className="time-picker_time">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="text"
          value={format(selectedTime, "HH:mm")}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          readOnly
        />
      </div>
      <div className="time-picker_btn">
        <button type="button" onClick={toggleDropdown}>
          <ClockIcon />
        </button>
      </div>
      {isDropdownOpen && (
        <DropDownWrapper ref={dropDownListRef}>
          <DropDownTitleWrapper>
            <DropDownTitle>{label}</DropDownTitle>
            <DropDownCancelBtn
              onClick={toggleDropdown}
              type="button"
            ></DropDownCancelBtn>
          </DropDownTitleWrapper>
          <DropDownPickerWrapper>
            {/* hours */}
            <DropDownPickerTime>
              <Button
                onClick={() => {
                  setter([++hour, hour === 23 ? 0 : hour >= 12 ? 10 : 0]);
                }}
                type="button"
                disabled={hour === 23 || hourDisabled}
              >
                <ArrowUpIcon />
              </Button>
              <Input
                id="hour"
                type="text"
                value={hour < 10 ? `0${hour}` : hour}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setter([e.target.value, minute])}
                disabled={hourDisabled}
                readOnly
              ></Input>
              <Button
                onClick={() => {
                  setter([--hour, minute]);
                }}
                type="button"
                disabled={hour === 9 || hourDisabled}
              >
                <ArrowDownIcon />
              </Button>
            </DropDownPickerTime>
            <Span>:</Span>
            {/* minutes */}
            <DropDownPickerTime>
              <Button
                onClick={() => {
                  setter([hour, ++minute]);
                }}
                type="button"
                disabled={
                  minute === 59 || hour === 23 || hour === 8 || minuteDisabled
                }
              >
                <ArrowUpIcon />
              </Button>
              <Input
                id="minute"
                type="text"
                value={minute < 10 ? `0${minute}` : minute}
                disabled={hour === 23 || hour === 8 || minuteDisabled}
                readOnly
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setter([hour, e.target.value])}
              ></Input>
              <Button
                onClick={() => {
                  setter([hour, --minute]);
                }}
                type="button"
                disabled={
                  minute === 0 || hour === 23 || hour === 8 || minuteDisabled
                }
              >
                <ArrowDownIcon />
              </Button>
            </DropDownPickerTime>
          </DropDownPickerWrapper>
          <DropDownFootWrapper>
            <Button
              onClick={() => {
                toggleDropdown();
                handleTimeChange(
                  set(selectedTime, {
                    hours: hour,
                    minutes: minute,
                    seconds: 0,
                    milliseconds: 0,
                  })
                );
              }}
              type="button"
            >
              <TickIcon width={"80px"} height={"80px"} />
            </Button>
          </DropDownFootWrapper>
        </DropDownWrapper>
      )}
    </div>
  );
};

export default TimePickerComponent;
