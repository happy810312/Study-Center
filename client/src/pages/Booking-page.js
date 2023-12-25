import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getHours, addHours, set, parseISO } from "date-fns";
import { isBefore, isAfter, startOfDay, endOfDay } from "date-fns";

import TimePickerComponent from "../components/TimePicker-component";
import SeatReservedComponent from "../components/SeatReserved-component";
import SeatsService from "../services/seats-service";

const BookingPage = () => {
  // initialize seats
  const [isDateChoosed, setIsDateChoosed] = useState(false);
  const [unAvaliableSeats, setUnAvaliableSeats] = useState(null);
  // initialize time
  const [selectedDate, setSelectedDate] = useState(new Date()); // 只是給datePicker組件使用的
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [message, setMessage] = useState(null);

  const handleStartTimeChange = (newStartTime) => {
    const nextHourTime = addHours(newStartTime, 1);
    setStartTime(newStartTime);
    setEndTime(nextHourTime);
  };
  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime);
  };
  const handleSearch = () => {
    function formatDateToISO(dateString) {
      const date = new Date(dateString);
      return date.toISOString();
    }

    const startTimeISO = formatDateToISO(startTime);
    const endTimeISO = formatDateToISO(endTime);

    if (isBefore(parseISO(endTime), parseISO(startTime))) {
      return setMessage({
        message: "Start time must be earlier than end time.",
      });
    }

    SeatsService.getUnAvaliableSeats(startTimeISO, endTimeISO)
      .then((data) => {
        const foundUnAvaliableSeats = data.data;
        if (foundUnAvaliableSeats) {
          setIsDateChoosed(true);
          setUnAvaliableSeats(foundUnAvaliableSeats);
        }
      })
      .catch((e) => {
        setMessage(e);
      });
  };

  useEffect(() => {
    const initializeTime = (date, startHour, endHour) => {
      const startTime = set(date, {
        hours: startHour,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      const endTime = set(date, {
        hours: endHour,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      setStartTime(startTime);
      setEndTime(endTime);
    };

    const today = startOfDay(new Date());
    const selectedDay = startOfDay(selectedDate);

    if (isAfter(selectedDay, today) || getHours(selectedDate) < 8) {
      initializeTime(selectedDay, 8, 9);
    } else if (getHours(selectedDate) >= 23) {
      const nextDay = endOfDay(addHours(selectedDay, 1));
      initializeTime(nextDay, 8, 9);
    } else {
      initializeTime(
        selectedDate,
        getHours(selectedDate),
        getHours(selectedDate) + 1
      );
    }
  }, [selectedDate]);

  return (
    <section
      className="booking trigger-for-header-grey-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="booking_wrapper">
          {!isDateChoosed && (
            <h2 className="booking-title">Let's start booking a seat.</h2>
          )}
          {isDateChoosed && (
            <h2 className="booking-title">Choose your seat.</h2>
          )}
          {!isDateChoosed && (
            <h3 className="booking-subtitle">
              Choosing a day is not as good as seizing the day.
            </h3>
          )}
          {isDateChoosed && (
            <h3 className="booking-subtitle">
              All the seats with background white are avaliable.
            </h3>
          )}
          {message && (
            <div className="alert alert-danger mb-5">{message.message}</div>
          )}
          <div className="booking-menu">
            {!isDateChoosed && (
              <div className="booking-menu_navigation">
                <form className="booking-menu_navigation">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select a Date"
                      disablePast
                      showDaysOutsideCurrentMonth
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                      }}
                      format="yyyy/MM/dd"
                    />
                  </LocalizationProvider>
                  <TimePickerComponent
                    id="startTime"
                    label="Start Time"
                    selectedTime={startTime}
                    onChange={handleStartTimeChange}
                    hourDisabled
                    minuteDisabled
                  />
                  <TimePickerComponent
                    id="endTime"
                    label="End Time"
                    selectedTime={endTime}
                    onChange={handleEndTimeChange}
                    minuteDisabled
                  />
                  <button
                    type="button"
                    className="booking-menu_navigation-search"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
            {isDateChoosed && (
              <SeatReservedComponent
                startTime={startTime}
                endTime={endTime}
                setIsDateChoosed={setIsDateChoosed}
                foundUnAvaliableSeats={unAvaliableSeats}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
