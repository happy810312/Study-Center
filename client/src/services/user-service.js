import axios from "axios";

const API_URL =
  process.env.REACT_APP_USER_API_URL || "http://localhost:8080/api/user";

class UserService {
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  getProfile(_id) {
    return axios.get(API_URL + "/" + _id);
  }
  getFilesName() {
    return axios.get(API_URL + "/files/picturesName");
  }
  patchThumbnail(_id, file) {
    return axios.patch(API_URL + "/picture" + _id, { file });
  }
  patchPhoneNumner(_id, newPhone) {
    return axios.patch(API_URL + "/phoneNumber/" + _id, { newPhone });
  }
  patchWallet(_id) {
    return axios.patch(API_URL + "/deposit/" + _id, { newDeposit: 500 });
  }
}

const userServiceInstance = new UserService();

export default userServiceInstance;
