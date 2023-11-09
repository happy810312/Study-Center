const router = require("express").Router();
const Seat = require("../models").seat;
const seatValidation = require("../validation").seatValidation;

router.use((req, res, next) => {
  console.log("正在接收一個request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("正在接收一個seat api...");
});

// get一個日期、時間，回傳在此時間區間內占用的座位
router.get("/search", async (req, res) => {
  const { startTime, endTime } = req.query;
  // console.log("Recieved startTime:" + new Date(startTime));
  // console.log("Recieved endTime:" + new Date(endTime));

  // 檢查日期字符串是否有效
  const parsedStartTime = Date.parse(startTime); // 1695999959000
  const parsedEndTime = Date.parse(endTime); // 1696003559000

  if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
    return res.status(400).send({ msg: "Invalid date format." });
  }

  try {
    const foundSeats = await Seat.find({
      $or: [
        {
          // MongoDB抓出来的startTime 在 前端输入的時間區間內
          // MongoDB抓出来的endTime 在 前端输入的時間區間內
          startTime: { $gte: new Date(startTime), $lte: new Date(endTime) },
          endTime: { $gte: new Date(startTime), $lte: new Date(endTime) },
        },
        {
          // MongoDB抓出来的startTime 在 前端输入的時間區間內
          // MongoDB抓出来的endTime 大於 前端输入的endTime
          startTime: { $gte: new Date(startTime), $lte: new Date(endTime) },
          endTime: { $gte: new Date(endTime) },
        },
        {
          // MongoDB抓出来的startTime 小於 前端输入的startTime
          // MongoDB抓出来的endTime 在 前端输入的時間區間內
          startTime: { $lte: new Date(startTime) },
          endTime: { $gte: new Date(startTime), $lte: new Date(endTime) },
        },
        {
          // MongoDB抓出来的startTime 在 前端输入的startTime之前
          // MongoDB抓出来的endTime 在 前端输入的endTime之後
          startTime: { $lte: new Date(startTime) },
          endTime: { $gte: new Date(endTime) },
        },
      ],
    }).exec();
    const seatUnAvalible = {};
    foundSeats.forEach((seat) => {
      seatUnAvalible[seat.seatNumber] = "unAvaliable seat";
    });
    return res.send(seatUnAvalible);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// post使用時間+座位號碼 => 儲存
router.post("/reserved", async (req, res) => {
  // const { error } = seatValidation(req.body);
  // if (error) return res.send(401).send(error.details[0].message);

  const { seatNumber, startTime, endTime } = req.body;
  try {
    // console.log(req.user);
    const newSeat = new Seat({
      seatNumber,
      startTime,
      endTime,
      user: req.user._id,
      username: req.user.username,
      cardID: req.user.cardID,
    });
    console.log(newSeat);

    const totalPrice = newSeat.calculatePrice();
    newSeat.price = totalPrice;

    // 扣除用戶錢包的金額
    if (req.user.wallet < totalPrice) {
      return res.status(400).send({ msg: "Remaining balance is not enough." });
    }
    req.user.wallet -= totalPrice;
    const savedUser = await req.user.save();
    const savedSeat = await newSeat.save();

    return res.send({
      msg: "Reserved successfully",
      seatInfo: savedSeat,
      userInfo: savedUser,
    });
  } catch (e) {
    console.log(e);
    req.user.wallet += totalPrice;
    return res.status(500).send(e);
  }
});

module.exports = router;
