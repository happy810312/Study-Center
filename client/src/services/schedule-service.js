import axios from "axios";

const API_URL = "http://localhost:8080/api/schedule";

class ScheduleService {
  // 取得使用者所有預約情形
  getAllScheduleCount() {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/allCount", {
      headers: { Authorization: token },
    });
  }

  // 取得指定期間的所有預約數量
  getDateRangeCount(startDate, endDate, items) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.get(
      API_URL +
        `/dateRangeCount?startDate=${startDate}&endDate=${endDate}&items=${items}`,
      {
        headers: { Authorization: token },
      }
    );
  }

  // 依照頁數、單頁面展示數量取得使用者預約情形
  getPageSchedule(page, items) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + `?page=${page}&items=${items}`, {
      headers: { Authorization: token },
    });
  }

  // 列出指定startDate和endDate的預約情形
  getDateRangeSchedule(startDate, endDate) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.get(
      API_URL + `/dateRange?startDate=${startDate}&endDate=${endDate}`,
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
    return axios.delete(`${API_URL}/${orderId}`, {
      headers: { Authorization: token },
    });
  }
}

export default new ScheduleService();
