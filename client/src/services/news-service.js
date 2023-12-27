import axios from "axios";

const API_URL =
  process.env.REACT_APP_NEWS_API_URL || "http://localhost:8080/api/news";

class NewsService {
  getNews() {
    return axios.get(API_URL + "/");
  }
  postNews(title, content) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/",
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  deleteNews(_id) {
    let token;
    if (localStorage.getItem("User")) {
      token = JSON.parse(localStorage.getItem("User")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const newsServiceInstance = new NewsService();

export default newsServiceInstance;
