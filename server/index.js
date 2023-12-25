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

const { MongoClient, ServerApiVersion } = require("mongodb");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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
