const { set, startOfDay, endOfDay } = require("date-fns");

const router = require("express").Router();
const Seat = require("../models").seat;
const seatsMiddleware = require("../middlewares/seatsMiddleware");
const seatsController = require("../controllers/seatsController");

router.use((req, res, next) => {
  console.log("正在接收一個request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("正在接收一個seat api...");
});

// get一個日期、時間，回傳在此時間區間內占用的座位
router.get(
  "/search",
  seatsMiddleware.checkPeriodMiddleware,
  async (req, res) => {
    const { startTime, endTime, period } = req.query; // period是時段預約的
    const { hourlyPeriod } = req; // req.hourlyPeriod從middleware傳入
    console.log(hourlyPeriod); // period[0]

    // 檢查日期字符串是否有效
    const parsedStartTime = Date.parse(startTime); // 1695999959000
    const parsedEndTime = Date.parse(endTime); // 1696003559000

    if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    try {
      const foundSeats = await Seat.aggregate([
        /* 
      period的抓取是否可預約規則：
      1.確認輸入的startTime和endTime屬於period中的哪一個時段
      2.抓出$match符合startTime和endTime的period的資料
      3.確認輸入的startTime和endTime是否在資料庫內的getDate(startTime)及getDate(endTime)內
      */
        {
          $facet: {
            // 1.使用者使用hourly，針對hourly來抓資料(已完成)
            // 2.使用者使用period，針對hourly來抓資料(已完成)
            hourlySearch: [
              {
                $match: {
                  $or: [
                    {
                      reservationType: "hourly",
                      period: period || { $in: hourlyPeriod }, // 改成就算預約小時零租，也要用middleware計算寫入period
                      // MongoDB抓出来的startTime 在 前端输入的時間區間內
                      // MongoDB抓出来的endTime 在 前端输入的時間區間內
                      startTime: {
                        $gte: new Date(startTime),
                        $lte: new Date(endTime),
                      },
                      endTime: {
                        $gte: new Date(startTime),
                        $lte: new Date(endTime),
                      },
                    },
                    {
                      reservationType: "hourly",
                      period: period || { $in: hourlyPeriod }, // 改成就算預約小時零租，也要用middleware計算period
                      // MongoDB抓出来的startTime 在 前端输入的時間區間內
                      // MongoDB抓出来的endTime 大於 前端输入的endTime
                      startTime: {
                        $gte: new Date(startTime),
                        $lte: new Date(endTime),
                      },
                      endTime: { $gte: new Date(endTime) },
                    },
                    {
                      reservationType: "hourly",
                      period: period || { $in: hourlyPeriod }, // 改成就算預約小時零租，也要用middleware計算period
                      // MongoDB抓出来的startTime 小於 前端输入的startTime
                      // MongoDB抓出来的endTime 在 前端输入的時間區間內
                      startTime: { $lte: new Date(startTime) },
                      endTime: {
                        $gte: new Date(startTime),
                        $lte: new Date(endTime),
                      },
                    },
                    {
                      reservationType: "hourly",
                      period: period || { $in: hourlyPeriod }, // 改成就算預約小時零租，也要用middleware計算period
                      // MongoDB抓出来的startTime 在 前端输入的startTime之前
                      // MongoDB抓出来的endTime 在 前端输入的endTime之後
                      startTime: { $lte: new Date(startTime) },
                      endTime: { $gte: new Date(endTime) },
                    },
                  ],
                },
              },
            ],
            // 1.使用者使用hourly，針對period來抓資料
            // 2.使用者使用period，針對period來抓資料
            periodSearch: [
              // addFields將startTime、endTime調整到startOfDay、endOfDay
              {
                $addFields: {
                  // 將 period 內容改成實際時間
                  newStartTime: { $literal: startOfDay(new Date(startTime)) },
                  newEndTime: { $literal: endOfDay(new Date(endTime)) },
                },
              },
              {
                $match: {
                  $expr: {
                    $or: [
                      {
                        $and: [
                          { $eq: ["$reservationType", "period"] },
                          {
                            $eq: ["$period", period || { $in: hourlyPeriod }],
                          },
                          // MongoDB抓出来的startTime 在 前端输入的時間區間內
                          // MongoDB抓出来的endTime 在 前端输入的時間區間內
                          { $gte: ["$startTime", "$newStartTime"] },
                          { $lte: ["$startTime", "$newEndTime"] },
                          { $gte: ["$endTime", "$newStartTime"] },
                          { $lte: ["$endTime", "$newEndTime"] },
                        ],
                      },
                      {
                        $and: [
                          { $eq: ["$reservationType", "period"] },
                          {
                            $eq: ["$period", period || { $in: hourlyPeriod }],
                          },
                          // MongoDB抓出来的startTime 在 前端输入的時間區間內
                          // MongoDB抓出来的endTime 在 前端输入的時間區間內
                          { $gte: ["$startTime", "$newStartTime"] },
                          { $lte: ["$startTime", "$newEndTime"] },
                          { $gte: ["$endTime", "$newEndTime"] },
                        ],
                      },
                      {
                        $and: [
                          { $eq: ["$reservationType", "period"] },
                          {
                            $eq: ["$period", period || { $in: hourlyPeriod }],
                          },
                          // MongoDB抓出来的startTime 在 前端输入的時間區間內
                          // MongoDB抓出来的endTime 在 前端输入的時間區間內
                          { $lte: ["$startTime", "$newStartTime"] },
                          { $gte: ["$endTime", "$newStartTime"] },
                          { $lte: ["$endTime", "$newEndTime"] },
                        ],
                      },
                      {
                        $and: [
                          { $eq: ["$reservationType", "period"] },
                          {
                            $eq: ["$period", period || { $in: hourlyPeriod }],
                          },
                          // MongoDB抓出来的startTime 在 前端输入的時間區間內
                          // MongoDB抓出来的endTime 在 前端输入的時間區間內
                          { $lte: ["$startTime", "$newStartTime"] },
                          { $gte: ["$endTime", "$newEndTime"] },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            newStartTime: 1,
            newEndTime: 1,
          },
        },
        // {
        //   $project: {
        //     combinedResults: {
        //       $concatArrays: ["$hourlySearch", "$periodSearch"],
        //     },
        //   },
        // },
      ]);
      console.log(foundSeats);
      console.log(foundSeats[0].periodSearch); // hourly search seat number
      // const seatUnAvliable = foundSeats[0]?.combinedResults.reduce(
      //   (result, seat) => {
      //     result[seat.seatNumber] = "unAvailable seat";
      //     return result;
      //   },
      //   {}
      // );
      // return res.send(seatUnAvliable);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error.", error });
    }
  }
);

// post使用時間+座位號碼 => 儲存
router.post(
  "/reserved",
  seatsMiddleware.checkPeriodMiddleware,
  async (req, res) => {
    // const { error } = seatValidation(req.body);
    // if (error) return res.send(401).send(error.details[0].message);

    let { seatNumber, startTime, endTime, period, reservationType } = req.body;
    const { hourlyPeriod } = req;

    console.log({ seatNumber, startTime, endTime, period, reservationType });

    try {
      const periodsToUse = !period ? hourlyPeriod : [period];

      const savedSeats = await Promise.all(
        periodsToUse.map(async (periodItem) => {
          const newSeat = new Seat({
            seatNumber,
            startTime,
            endTime,
            period: periodItem,
            reservationType,
            user: req.user._id,
            username: req.user.username,
            cardID: req.user.cardID,
          });
          const totalPrice = newSeat.calculatePrice(newSeat.period);
          newSeat.price = totalPrice;

          // 扣除用户钱包的金额
          if (req.user.wallet < totalPrice) {
            throw new Error("Remaining balance is not enough.");
          }
          req.user.wallet -= totalPrice;

          return newSeat.save();
        })
      );

      const savedUser = await req.user.save();

      return res.json({
        message: "Reserved successfully",
        seatInfo: savedSeats,
        userInfo: savedUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error.", error: error.message });
    }
  }
);

router.post("/testReserved", async (req, res) => {
  const { seatNumber, startTime, endTime } = req.body;

  try {
    const newSeat = new Seat({
      seatNumber,
      startTime,
      endTime,
      periods: periodsToUse, // 存储所有相关的 period
      reservationType,
      user: req.user._id,
      username: req.user.username,
      cardID: req.user.cardID,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
