import axios from "axios";

const API_URL =
  process.env.REACT_APP_SEATS_API_URL || "http://localhost:8080/api/seats";

class SeatService {
  reserveSeat(seatNumber, startTime, endTime, period) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/",
      {
        seatNumber,
        startTime,
        endTime,
        period,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getUnAvaliableSeats(startTime, endTime, period) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.get(
      `${API_URL}?startTime=${startTime}&endTime=${endTime}&period=${period}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

const seatServiceInstance = new SeatService();

export default seatServiceInstance;
