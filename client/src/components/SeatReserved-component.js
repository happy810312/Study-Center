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
  const A_block_seats = [
    "A01",
    "A02",
    "A03",
    "A04",
    "A05",
    "A06",
    "A07",
    "A08",
    "A09",
  ];
  const B_block_seats = [
    "B01",
    "B02",
    "B03",
    "B04",
    "B05",
    "B06",
    "B07",
    "B08",
    "B09",
  ];
  const C_block_seats = [
    "C01",
    "C02",
    "C03",
    "C04",
    "C06",
    "C07",
    "C08",
    "C09",
    "C10",
    "C11",
    "C12",
  ];
  const D_block_seats = [
    "D01",
    "D02",
    "D03",
    "D04",
    "D05",
    "D06",
    "D07",
    "D08",
    "D09",
    "D10",
    "D11",
    "D12",
  ];
  const E_block_seats = [
    "E02",
    "E03",
    "E04",
    "E05",
    "E06",
    "E07",
    "E08",
    "E09",
    "E10",
    "E11",
    "E12",
    "E13",
  ];
  const F_block_seats = [
    "F01",
    "F02",
    "F03",
    "F05",
    "F06",
    "F07",
    "F08",
    "F09",
    "F10",
    "F11",
    "F12",
    "F13",
    "F15",
    "F16",
  ];
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
              {message && <div className="alert alert-danger">{message}</div>}
              <div className="seat-reserved_btn-group">
                <button onClick={handleBackToTimePicker} type="button">
                  上一頁
                </button>
                <button onClick={handleRainSound2F} type="button">
                  RainSound-2F
                </button>
                <button onClick={handleRainSound3F} type="button">
                  RainSound-3F
                </button>
              </div>

              {rainSound2F && (
                <div className="seat-reserved_inner-grid rain-sound-2F">
                  <div className="block block-information-counter">
                    <span className="block-name">Front Desk</span>
                  </div>
                  <div className="block block-rest"></div>
                  <div className="block block-A">
                    <span className="block-name">A Room</span>
                    {A_block_seats.map((seatNumber) => {
                      return (
                        <div className={`seat-no ${seatNumber}`}>
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                  <div className="block block-B">
                    <span className="block-name">B Room</span>
                    {B_block_seats.map((seatNumber) => {
                      return (
                        <div className={`seat-no ${seatNumber}`}>
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                  <div className="block block-C">
                    <span className="block-name">C Room</span>
                    {C_block_seats.map((seatNumber) => {
                      return (
                        <div className={`seat-no ${seatNumber}`}>
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                  <div className="block block-D">
                    <span className="block-name">D Room</span>
                    {D_block_seats.map((seatNumber) => {
                      return (
                        <div className={`seat-no ${seatNumber}`}>
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                  <div className="block block-E">
                    <span className="block-name">E Room</span>
                    {E_block_seats.map((seatNumber) => {
                      return (
                        <div className={`seat-no ${seatNumber}`}>
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
                  <div className="block block-F">
                    <span className="block-name">F Room</span>
                    {F_block_seats.map((seatNumber) => {
                      const isUnAvaliable =
                        foundUnAvaliableSeats[seatNumber] ===
                        "unAvaliable seat";
                      return (
                        <div
                          onClick={handleSelectedSeat}
                          className={`seat-no ${seatNumber} ${
                            selectedSeat == seatNumber ? "selected" : ""
                          } ${isUnAvaliable ? "unavaliable" : ""}`}
                        >
                          {seatNumber}
                        </div>
                      );
                    })}
                  </div>
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
                  </div>
                  <div className="block block-V-bottom"></div>
                  <div className="block block-V-right"></div>
                  <div className="block block-V-left">
                    <div className="seat-no V07">V07</div>
                    <div className="seat-no V08">V08</div>
                    <div className="seat-no V09">V09</div>
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
