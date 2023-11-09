import axios from "axios";

const API_URL = "http://localhost:8080/api/seats";

class SeatService {
  getSeatInfomation(seatNumber) {
    return axios.get(API_URL + "/seatSelected/" + seatNumber);
  }
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
}

export default new SeatService();
