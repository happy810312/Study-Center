const { set } = require("date-fns");

const router = require("express").Router();
const Seat = require("../models").seat;
const seatsController = require("../controllers/seatsController");

router.use((req, res, next) => {
  console.log("正在接收一個request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("正在接收一個seat api...");
});

// get一個日期、時間，回傳在此時間區間內占用的座位
router.get("/search", async (req, res) => {
  const { startTime, endTime, period } = req.query;

  // 檢查日期字符串是否有效
  const parsedStartTime = Date.parse(startTime); // 1695999959000
  const parsedEndTime = Date.parse(endTime); // 1696003559000

  if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
    return res.status(400).send({ msg: "Invalid date format." });
  }

  try {
    const checkPeriodSlot = (ISOtime, period) => {
      const initialTime = (
        date,
        startHour,
        startMinute,
        endHour,
        endMinute
      ) => {
        return {
          start: set(new Date(date), {
            hours: startHour,
            minutes: startMinute,
            seconds: 0,
            milliseconds: 0,
          }),
          end: set(new Date(date), {
            hours: endHour,
            minutes: endMinute,
            seconds: 0,
            milliseconds: 0,
          }),
        };
      };

      if (period === "morning") {
        return initialTime(ISOtime, 8, 0, 12, 10);
      } else if (period === "afternoon") {
        return initialTime(ISOtime, 12, 10, 17, 10);
      } else if (period === "evening") {
        return initialTime(ISOtime, 17, 10, 23, 0);
      }
    };
    const foundSeats = await Seat.aggregate([
      /* 
      period的抓取是否可預約規則：
      1.確認輸入的startTime和endTime屬於period中的哪一個時段(應該是從前端確認?)
      2.抓出$match符合startTime和endTime的period的資料
      3.確認輸入的startTime和endTime是否在資料庫內的getDate(startTime)及getDate(endTime)內
      */
      {
        $facet: {
          hourlySearch: [
            {
              $match: {
                $or: [
                  {
                    reservationType: "hourly",
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
                    // MongoDB抓出来的startTime 在 前端输入的startTime之前
                    // MongoDB抓出来的endTime 在 前端输入的endTime之後
                    startTime: { $lte: new Date(startTime) },
                    endTime: { $gte: new Date(endTime) },
                  },
                ],
              },
            },
          ],
          periodSearch: [
            {
              // addFields將period內容改成實際時間
              $match: {
                reservationType: "period",
              },
            },
          ],
        },
      },
      {
        $project: {
          combinedResults: {
            $concatArrays: ["$hourlySearch", "$dailySearch"],
          },
        },
      },
    ]); // 調整schedule讓period有之後，才可以改成下面那行，然後也需要調整hours的設定
    // const foundSeats = await Seat.find({
    //   $or: [
    //     {
    //       // MongoDB抓出来的startTime 在 前端输入的時間區間內
    //       // MongoDB抓出来的endTime 在 前端输入的時間區間內
    //       startTime: {
    //         $gte: checkPeriodSlot(startTime, period).start,
    //         $lte: checkPeriodSlot(endTime, period).end,
    //       },
    //       endTime: {
    //         $gte: checkPeriodSlot(startTime, period).start,
    //         $lte: checkPeriodSlot(endTime, period).end,
    //       },
    //     },
    //     {
    //       // MongoDB抓出来的startTime 在 前端输入的時間區間內
    //       // MongoDB抓出来的endTime 大於 前端输入的endTime
    //       startTime: {
    //         $gte: checkPeriodSlot(startTime, period).start,
    //         $lte: checkPeriodSlot(endTime, period).end,
    //       },
    //       endTime: { $gte: checkPeriodSlot(endTime, period).end },
    //     },
    //     {
    //       // MongoDB抓出来的startTime 小於 前端输入的startTime
    //       // MongoDB抓出来的endTime 在 前端输入的時間區間內
    //       startTime: { $lte: checkPeriodSlot(startTime, period).start },
    //       endTime: {
    //         $gte: checkPeriodSlot(startTime, period).start,
    //         $lte: checkPeriodSlot(endTime, period).end,
    //       },
    //     },
    //     {
    //       // MongoDB抓出来的startTime 在 前端输入的startTime之前
    //       // MongoDB抓出来的endTime 在 前端输入的endTime之後
    //       startTime: { $lte: checkPeriodSlot(startTime, period).start },
    //       endTime: { $gte: checkPeriodSlot(endTime, period).end },
    //     },
    //   ],
    // }).exec();

    // const seatUnAvalible = {};
    // foundSeats.forEach((seat) => {
    //   seatUnAvalible[seat.seatNumber] = "unAvaliable seat";
    // });
    const seatUnavailable = foundSeats.reduce((result, seat) => {
      result[seat.seatNumber] = "unAvailable seat";
      return result;
    }, {});
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
