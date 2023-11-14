import axios from "axios";
const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  loginGoogle() {
    return axios.get(API_URL + "/loginGoogle");
  }
  logout() {
    localStorage.removeItem("User");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("User"));
  }
}

export default new AuthService();
