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
const newsRoute = require("./routes").news;

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
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connecting to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

// mongoose
//   .connect("mongodb://127.0.0.1:27017/studyCenterPractice")
//   .then(() => {
//     console.log("connecting to mongodb");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// 限制照片大小10MB
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// cors要在路由之前設定，才可以確保在處理跨來源之前使用cors
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/news", newsRoute);
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

app.listen(process.env.PORT || 8080, () => {
  console.log("listening port 8080...");
});
