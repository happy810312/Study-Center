const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRoute = require("./routes").auth;
const userRoute = require("./routes").user;
const seatsRoute = require("./routes").seats;
const rechargeRoute = require("./routes").recharge;
const scheduleRoute = require("./routes").schedule;

const passport = require("passport");
const {
  jwtStrategy,
  googleStrategy,
  facebookStrategy,
} = require("./config/passport");
passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

mongoose
  .connect("mongodb://127.0.0.1:27017/studyCenterPractice")
  .then(() => {
    console.log("connecting to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors要在路由之前設定，才可以確保在處理跨來源之前使用cors
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/recharge", rechargeRoute);
// header若沒有jwt，會return unauthorization
app.use(
  "/api/seats",
  passport.authenticate("jwt", { session: false }),
  seatsRoute
);
app.use(
  "/api/schedule",
  passport.authenticate("jwt", { session: false }),
  scheduleRoute
);

app.listen(8080, () => {
  console.log("listening port 8080...");
});
