import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState(null);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [message, setMessage] = useState(null);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUpBtn = () => {
    AuthService.register(username, email, password)
      .then(() => {
        window.alert("註冊成功");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
        console.log(message);
      });
  };
  return (
    <div className="register trigger-for-header-grey-light col-md-12">
      <div className="container">
        <div
          className="register_wrapper"
          style={{ padding: "180px 0", maxWidth: "460px", margin: "auto" }}
        >
          <div className="register-inner">
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="form-group">
              <label htmlFor="username">UserName:</label>
              <input
                onChange={handleChangeUsername}
                type="text"
                className="form-control"
                name="username"
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="email">E-Mail:</label>
              <input
                onChange={handleChangeEmail}
                type="text"
                className="form-control"
                name="email"
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                onChange={handleChangePassword}
                type="password"
                className="form-control"
                name="password"
              />
            </div>
            <br />
            <button onClick={handleSignUpBtn} className="btn btn-primary">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
