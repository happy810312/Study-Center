import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

class UserService {
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  getProfile(_id) {
    return axios.get(API_URL + "/profile/" + _id);
  }
  getFilesName() {
    return axios.get(API_URL + "/files/picturesName");
  }
  postFiles(file) {
    return axios.post(API_URL + "/files/picturesName", { file });
  }
  patchPhoneNumner(_id, newPhone) {
    return axios.patch(API_URL + "/phoneNumber/" + _id, { newPhone });
  }
  patchWallet(_id) {
    return axios.patch(API_URL + "/deposit/" + _id, { newDeposit: 500 });
  }
}

export default new UserService();
