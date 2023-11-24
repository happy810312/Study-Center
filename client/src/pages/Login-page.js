import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import { UserIcon } from "../components/icons";

const LoginPage = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [message, setMessage] = useState(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginBtn = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("User", JSON.stringify(response.data));
      setCurrentUser(AuthService.getCurrentUser());
      window.alert("登入成功");
      navigate("/");
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  const handleGoogleBtn = () => {
    // fetch是XMLHttpRequest，會受到CORS規範，要直接用網址(不受CORS規範)進入/api/auth/google
    window.location.href = "http://localhost:8080/api/auth/google";
  };
  const handleFacebookBtn = () => {
    window.location.href = "http://localhost:8080/api/auth/facebook";
  };
  // 為了看currentUser得值用的，因為是異步函數
  useEffect(() => {
    // 在 currentUser 被設置後執行的操作
    console.log("currentUser 值已更新：", currentUser);
  }, [currentUser]);
  return (
    <form className="trigger-for-header-dark">
      <div className="container">
        <div
          className="login_wrapper text-white"
          style={{ padding: "240px 0 20px", maxWidth: "460px", margin: "auto" }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center pb-5">
            <UserIcon width={"125px"} height={"125px"} fill={"#F5F2F2"} />
            <h2 className="display-4 pt-2">Login</h2>
          </div>
          {/* {currentUser && <div>{currentUser}</div>} */}
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              Email Address
            </label>
            <input
              onChange={handleChangeEmail}
              type="email"
              className="form-control"
              id="loginEmail"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              id="loginPassword"
            />
          </div>
          <div className="mb-3 form-check d-flex justify-content-between">
            <div className="login-remember">
              <input
                type="checkbox"
                className="form-check-input"
                id="loginCheck"
              />
              <label htmlFor="loginCheck" className="form-check-label">
                Remember Me
              </label>
            </div>
            <Link to="/register" className="form-to-register">
              No Account?
            </Link>
          </div>
          <div className="btn-group d-flex flex-column">
            <button
              onClick={handleLoginBtn}
              type="button"
              className="btn btn-dark my-2"
            >
              Login
            </button>
            <button
              onClick={handleGoogleBtn}
              type="button"
              className="btn btn-dark my-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
                <script xmlns="" />
              </svg>
              <span>Continue with Google</span>
            </button>
            {/* <a href="/auth">Google</a> */}
            <button
              onClick={handleFacebookBtn}
              type="button"
              className="btn btn-dark my-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                ></path>
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
