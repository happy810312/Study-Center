import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  addDays,
  addHours,
  addMinutes,
  getDate,
  getTime,
  setHours,
  setMinutes,
  subDays,
} from "date-fns";
import { isBefore, isAfter, isEqual, isWithinInterval } from "date-fns";
import { eachDayOfInterval, eachMinuteOfInterval } from "date-fns";
import { getHours, getMinutes, getSeconds, getMilliseconds } from "date-fns";
import { format, set, differenceInMinutes } from "date-fns";
import TimePickerComponent from "../components/TimePicker-component";
import SeatReservedComponent from "../components/SeatReserved-component";
import SeatsService from "../services/seats-service";

const BookingPage = () => {
  // initialize seats
  const [isDateChoosed, setIsDateChoosed] = useState(false);
  const [unAvaliableSeats, setUnAvaliableSeats] = useState(null);
  // initialize time
  const [selectedDate, setSelectedDate] = useState(new Date()); // 只是給datePicker組件使用的
  const [startTime, setStartTime] = useState(
    getHours(selectedDate) < 8
      ? set(selectedDate, { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 })
      : set(selectedDate, { seconds: 0, milliseconds: 0 })
  );
  const [endTime, setEndTime] = useState(
    getHours(addHours(startTime, 1)) > 22
      ? set(selectedDate, { hours: 23, seconds: 0, milliseconds: 0 })
      : addHours(startTime, 1)
  );

  // 依照時段調整end time
  const period = (dateTime) => {
    const morningEndTime = set(dateTime, {
      hours: 12,
      minutes: 10,
      seconds: 0,
      milliseconds: 0,
    });
    const afternoonEndTime = set(dateTime, {
      hours: 17,
      minutes: 10,
      seconds: 0,
      milliseconds: 0,
    });
    const eveningEndTime = set(dateTime, {
      hours: 23,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    if (isBefore(dateTime, morningEndTime)) {
      return "morning";
    } else if (
      isAfter(dateTime, morningEndTime) &&
      isBefore(dateTime, afternoonEndTime)
    ) {
      return "afternoon";
    } else {
      return "evening";
    }
  };
  const endTimeUpdateByPeriod = (dateTime) => {
    const nextHourTime = addHours(dateTime, 1);
    const morningEndTime = set(dateTime, {
      hours: 12,
      minutes: 10,
      seconds: 0,
      milliseconds: 0,
    });
    const afternoonEndTime = set(dateTime, {
      hours: 17,
      minutes: 10,
      seconds: 0,
      milliseconds: 0,
    });
    const dayRestTime = set(dateTime, {
      hours: 23,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 開始時間在早段前，但剛好跨時段
    if (
      period(dateTime) === "morning" &&
      isAfter(nextHourTime, morningEndTime)
    ) {
      setEndTime(morningEndTime);
    }
    // 開始時間在午段前，但剛好跨時段
    else if (
      period(dateTime) === "afternoon" &&
      isAfter(nextHourTime, afternoonEndTime)
    ) {
      setEndTime(afternoonEndTime);
    }
    // 超過23點直接預約隔天的
    if (isAfter(nextHourTime, dayRestTime)) {
      setEndTime(dayRestTime);
    }
  };

  const handleStartTimeChange = (newStartTime) => {
    const nextHourTime = addHours(newStartTime, 1);
    setStartTime(newStartTime);
    setEndTime(nextHourTime);
  };
  const handleEndTimeChange = (newEndTime) => {
    // console.log(newEndTime);
    setEndTime(newEndTime);
  };
  const handleSearch = () => {
    function formatDateToISO(dateString) {
      const date = new Date(dateString);
      return date.toISOString();
    }

    const startTimeISO = formatDateToISO(startTime);
    const endTimeISO = formatDateToISO(endTime);

    SeatsService.getUnAvaliableSeats(startTimeISO, endTimeISO)
      .then((data) => {
        const foundUnAvaliableSeats = data.data;
        if (foundUnAvaliableSeats) {
          setIsDateChoosed(true);
          setUnAvaliableSeats(foundUnAvaliableSeats);
          console.log(foundUnAvaliableSeats);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    endTimeUpdateByPeriod(startTime);
  }, [startTime]);
  useEffect(() => {
    // endTime改變，改變不可調整的樣式
  }, [endTime]);

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
              All the seats are very comfortable.
            </h3>
          )}
          <div className="booking-menu">
            {!isDateChoosed && (
              <div className="booking-menu_navigation">
                <form action="" className="booking-menu_navigation">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select a Date"
                      disablePast
                      showDaysOutsideCurrentMonth
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(() => {
                          if (getHours(date) < 8) {
                            return set(date, {
                              hours: 8,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          } else if (getHours(date) > 23) {
                            return set(date, {
                              date: date + 1,
                              hours: 8,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          } else {
                            return date;
                          }
                        });
                        // 如果還不到早上8點調整成早上8點，超過晚上23點調整成隔天早上8點
                        setStartTime(() => {
                          if (isAfter(date, new Date())) {
                            return set(date, {
                              hours: 8,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          }
                          if (getHours(date) < 8) {
                            return set(date, {
                              hours: 8,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          } else if (getHours(date) > 23) {
                            return set(date, {
                              date: date + 1,
                              hours: 8,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          } else {
                            return date;
                          }
                        });
                        setEndTime(() => {
                          if (isAfter(date, new Date())) {
                            return set(date, {
                              hours: 9,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          }
                          if (getHours(date) < 8) {
                            return set(date, {
                              hours: 9,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          } else if (getHours(date) > 23) {
                            return set(date, {
                              date: date + 1,
                              hours: 9,
                              minutes: 0,
                              seconds: 0,
                              milliseconds: 0,
                            });
                          } else {
                            return addHours(date, 1);
                          }
                        });
                      }}
                      format="yyyy/MM/dd"
                      formatDensity
                    />
                  </LocalizationProvider>
                  <TimePickerComponent
                    label="Start Time"
                    selectedTime={startTime}
                    onChange={handleStartTimeChange}
                  />
                  <TimePickerComponent
                    label="End Time"
                    selectedTime={endTime}
                    onChange={handleEndTimeChange}
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
