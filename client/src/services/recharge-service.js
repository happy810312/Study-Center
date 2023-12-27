import axios from "axios";
const API_URL =
  process.env.REACT_APP_RECHARGE_API_URL ||
  "http://localhost:8080/api/recharge";

class RechargeService {
  recharge(amount) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/linepay",
      {
        amount,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

const rechargeServiceInstance = new RechargeService();

export default rechargeServiceInstance;
