import axios from "axios";

const API_URL =
  process.env.REACT_APP_SCHEDULE_API_URL ||
  "http://localhost:8080/api/schedule";

class ScheduleService {
  getSchedules(startDate, endDate, page, items) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.get(
      API_URL +
        `?startDate=${startDate}&endDate=${endDate}&page=${page}&items=${items}`,
      {
        headers: { Authorization: token },
      }
    );
  }

  // 取消預約資訊
  deleteReservation(orderId) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.delete(`${API_URL}?orderId=${orderId}`, {
      headers: { Authorization: token },
    });
  }
}

const scheduleServiceInstance = new ScheduleService();

export default scheduleServiceInstance;
