import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import seatsService from "../services/seats-service";

const SeatReservedComponent = ({
  startTime,
  endTime,
  setIsDateChoosed,
  foundUnAvaliableSeats,
}) => {
  // 定義座位編號
  const seats = {
    A: Array.from({ length: 9 }, (_, index) => {
      return `A0${index + 1}`; // A01 - A09
    }),
    B: Array.from({ length: 9 }, (_, index) => {
      return `B0${index + 1}`; // B01 - B09
    }),
    C: Array.from({ length: 12 }, (_, index) => {
      const seatNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      if (index + 1 === 5) {
        return null;
      }
      return `C${seatNumber}`;
    }).filter((seat) => seat !== null),
    D: Array.from({ length: 12 }, (_, index) => {
      const seatNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      return `D${seatNumber}`;
    }),
    E: Array.from({ length: 13 }, (_, index) => {
      const seatNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      if (index + 1 === 1) {
        return null;
      }
      return `E${seatNumber}`;
    }).filter((seat) => seat !== null),
    F: Array.from({ length: 16 }, (_, index) => {
      const seatNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      if (index + 1 === 4 || index + 1 === 14) {
        return null;
      }
      return `F${seatNumber}`;
    }).filter((seat) => seat !== null),
  };

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [rainSound2F, setRainSound2F] = useState(true);

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleRainSound2F = () => {
    setRainSound2F(true);
  };
  const handleRainSound3F = () => {
    setRainSound2F(false);
  };
  const handleSelectedSeat = async (e) => {
    let seatNode = e.target;
    let seatNumber = e.target.textContent;
    if (seatNode.classList.contains("unavaliable")) {
      setMessage(`${seatNumber} is not avaliable.`);
      return;
    }

    setSelectedSeat(seatNumber);
  };
  const handleBackToTimePicker = () => {
    setIsDateChoosed(false);
  };
  const handleReserve = () => {
    seatsService
      .reserveSeat(selectedSeat, startTime, endTime)
      .then((data) => {
        window.alert(
          `Reserve successfully.\nSeatNo:${
            data.data.seatInfo.seatNumber
          }\nStartTime:${format(
            new Date(data.data.seatInfo.startTime),
            "yyyy/MM/dd HH:mm"
          )}\nEndTime:${format(
            new Date(data.data.seatInfo.endTime),
            "yyyy/MM/dd HH:mm"
          )}\nRemaining Balance:${data.data.userInfo.wallet}`
        );
        navigate("/schedule");
      })
      .catch((e) => {
        window.scrollTo({ top: "0", behavior: "smooth" });
        setMessage(e.response.data.msg);
      });
  };

  return (
    <>
      <section className="seat-reserved trigger-for-header-grey-light">
        <div className="container">
          <div className="seat-reserved_wrapper">
            <div className="seat-reserved_inner">
              <span className="seat-reserved_inner-time alert alert-success">
                {`Selected Timeslot : ${format(
                  startTime,
                  "yyyy/MM/dd HH:mm"
                )} - ${format(endTime, "yyyy/MM/dd HH:mm")}`}
              </span>
              <div className="seat-reserved_btn-group">
                <button onClick={handleBackToTimePicker} type="button">
                  <ArrowLeftIcon />
                </button>
                <button onClick={handleRainSound2F} type="button">
                  RainSound-2F
                </button>
                <button onClick={handleRainSound3F} type="button">
                  RainSound-3F
                </button>
              </div>
              {message && <div className="alert alert-danger">{message}</div>}
              {rainSound2F && (
                <div className="seat-reserved_inner-grid rain-sound-2F">
                  <div className="block block-information-counter">
                    <span className="block-name">Front Desk</span>
                  </div>
                  <div className="block block-rest"></div>
                  {Object.keys(seats).map((blockName) => {
                    if (!["A", "B", "C", "D", "E", "F"].includes(blockName)) {
                      return null;
                    }
                    return (
                      <div className={`block block-${blockName}`}>
                        <span className="block-name">{`${blockName} Room`}</span>
                        {seats[blockName].map((seatNumber) => {
                          const isUnAvaliable =
                            foundUnAvaliableSeats[seatNumber] ===
                            "unAvaliable seat";
                          return (
                            <div
                              onClick={handleSelectedSeat}
                              className={`seat-no ${seatNumber} ${
                                selectedSeat === seatNumber ? "selected" : ""
                              } ${isUnAvaliable ? "unavaliable" : ""}`}
                            >
                              {seatNumber}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
              {!rainSound2F && (
                <div className="seat-reserved_inner-grid rain-sound-3F">
                  <div className="block block-L-left">
                    <span className="block-name">L Room</span>
                    <div className="seat-no L01">L01</div>
                    <div className="seat-no L02">L02</div>
                    <div className="seat-no L03">L03</div>
                    <div className="seat-no L04">L04</div>
                    <div className="seat-no L05">L05</div>
                    <div className="seat-no L06">L06</div>
                    <div className="seat-no L07">L07</div>
                    <div className="seat-no L08">L08</div>
                    <div className="seat-no L09">L09</div>
                    <div className="seat-no L10">L10</div>
                    <div className="seat-no L11">L11</div>
                  </div>
                  <div className="block block-L-right">
                    <div className="seat-no L12">L12</div>
                    <div className="seat-no L13">L13</div>
                    <div className="seat-no L14">L14</div>
                    <div className="seat-no L15">L15</div>
                  </div>
                  <div className="block block-V-top">
                    <span className="block-name">Study Room</span>
                    <div className="seat-no V01">V01</div>
                    <div className="seat-no V02">V02</div>
                    <div className="seat-no V03">V03</div>
                    <div className="seat-no V04">V04</div>
                    <div className="seat-no V05">V05</div>
                    <div className="seat-no V06">V06</div>
                  </div>
                  <div className="block block-V-right"></div>
                  <div className="block block-V-left">
                    <div className="seat-no V07">V07</div>
                    <div className="seat-no V08">V08</div>
                    <div className="seat-no V09">V09</div>
                    <div className="seat-no V09">V10</div>
                    <div className="seat-no V09">V11</div>
                    <div className="seat-no V09">V12</div>
                    <div className="seat-no V09">V13</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="schedule-submit">
        <div className="container">
          <div className="schedule-submit_wrapper">
            <button
              onClick={handleReserve}
              type="button"
              className="schedule-submit-btn"
            >
              Reserved
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeatReservedComponent;
