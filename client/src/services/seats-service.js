import axios from "axios";

const API_URL = "http://localhost:8080/api/seats";

class SeatService {
  reserveSeat(seatNumber, startTime, endTime) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/reserved",
      {
        seatNumber,
        startTime,
        endTime,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getUnAvaliableSeats(startTime, endTime) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.get(
      `${API_URL}/search?startTime=${startTime}&endTime=${endTime}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // 測試period，service這邊不需要與hours的方法結合
  getUnAvaliableSeatsByPeriod(startDate, endDate, period) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.get(
      `${API_URL}/search?startTime=${startDate}&endTime=${endDate}&period=${period}`,
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
