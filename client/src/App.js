import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import Layout from "./components/Layout";
import HomePage from "./pages/Home-page";
import NewsPage from "./pages/News-page";
import SchedulePage from "./pages/Schedule-page";
import PlanPage from "./pages/Plan-page";
import PrivacyPolicyPage from "./pages/PrivacyPolicy-page";
import UserTermsPage from "./pages/UserTerms-page";
import Page404 from "./pages/Page404";
import LoginPage from "./pages/Login-page";
import Booking from "./pages/Booking-page";
import MonthyBooking from "./pages/MonthyBooking-page";
import RegisterPage from "./pages/Register-page";
import NewsManagePage from "./pages/NewsManage-page";
import ProfilePage from "./pages/Profile-page";
import AboutPage from "./pages/About-page";
import AuthService from "./services/auth-service";
import "./styles/style.css";

const App = () => {
  // null 改成 JSON.parse(localStorage.getItem("user")).user
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route
            index
            element={
              <HomePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/news"
            element={
              <NewsPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/schedule"
            element={
              <SchedulePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route path="/plan" element={<PlanPage />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />}></Route>
          <Route path="/user-terms" element={<UserTermsPage />}></Route>
          <Route
            path="/login"
            element={
              <LoginPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/monthy-booking" element={<MonthyBooking />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
        </Route>
        <Route path="news-manage" element={<NewsManagePage />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
