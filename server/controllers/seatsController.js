const { mongoose } = require("mongoose");
const Seat = require("../models").seat;
const { startOfDay, endOfDay } = require("date-fns");

/**
 * @desc Filter avaliable seats by hourly or period slot.
 * @route GET / api/seats?startTime=&endTime=[&period=]
 * @access Private
 */
const getAvaliableSeats = async (req, res) => {
  const { startTime, endTime, period } = req.query; // period是時段預約的
  const { hourlyPeriod } = req; // req.hourlyPeriod從middleware傳入

  // 檢查日期字符串是否有效
  const parsedStartTime = Date.parse(startTime); // 1695999959000
  const parsedEndTime = Date.parse(endTime); // 1696003559000

  if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
    return res.status(400).json({ message: "Invalid date format." });
  }

  try {
    const foundSeats = await Seat.aggregate([
      {
        $facet: {
          // 1.使用者使input hourly，針對hourly來抓資料
          hourlyInputHourlySearch: [
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
          // 2.使用者input period，針對hourly來抓資料
          periodInputHourlySearch: [
            {
              $match: {
                reservationType: "hourly",
                period: { $in: hourlyPeriod },
                // MongoDB抓出来的startTime 在 前端输入的時間區間內
                // MongoDB抓出来的endTime 在 前端输入的時間區間內
                // 因為搜尋的是hourly的條件，所以輸入period的範圍一定比找到的範圍大 => 一個條件就好
                startTime: {
                  $gte: new Date(startTime),
                  $lte: new Date(endTime),
                },
                endTime: {
                  $gte: new Date(startTime),
                  $lte: new Date(endTime),
                },
              },
            },
          ],
          // 3.使用者input hourly，針對period來抓資料
          hourlyInputPeriodSearch: [
            {
              $match: {
                reservationType: "period",
                period: { $in: hourlyPeriod },
                // MongoDB抓出来的startTime 在 前端输入的時間區間內
                // MongoDB抓出来的endTime 在 前端输入的時間區間內
                // 因為搜尋的是hourly的條件，所以輸入period的範圍一定比找到的範圍大 => 一個條件就好
                startTime: {
                  $gte: new Date(startTime),
                  $lte: new Date(endTime),
                },
                endTime: {
                  $gte: new Date(startTime),
                  $lte: new Date(endTime),
                },
              },
            },
          ],
          // 4.使用者input period，針對period來抓資料
          periodInputPeriodSearch: [
            {
              $match: {
                $or: [
                  {
                    reservationType: "period",
                    period,
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
                    reservationType: "period",
                    period,
                    // MongoDB抓出来的startTime 在 前端输入的時間區間內
                    // MongoDB抓出来的endTime 大於 前端输入的endTime
                    startTime: {
                      $gte: new Date(startTime),
                      $lte: new Date(endTime),
                    },
                    endTime: { $gte: new Date(endTime) },
                  },
                  {
                    reservationType: "period",
                    period,
                    // MongoDB抓出来的startTime 小於 前端输入的startTime
                    // MongoDB抓出来的endTime 在 前端输入的時間區間內
                    startTime: { $lte: new Date(startTime) },
                    endTime: {
                      $gte: new Date(startTime),
                      $lte: new Date(endTime),
                    },
                  },
                  {
                    reservationType: "period",
                    period,
                    // MongoDB抓出来的startTime 在 前端输入的startTime之前
                    // MongoDB抓出来的endTime 在 前端输入的endTime之後
                    startTime: { $lte: new Date(startTime) },
                    endTime: { $gte: new Date(endTime) },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        $project: {
          combinedResults: {
            $concatArrays: [
              "$hourlyInputHourlySearch",
              "$periodInputHourlySearch",
              "$hourlyInputPeriodSearch",
              "$periodInputPeriodSearch",
            ],
          },
        },
      },
      {
        $unwind: "$combinedResults",
      },
      {
        $replaceRoot: { newRoot: "$combinedResults" },
      },
    ]).exec();

    const seatUnAvliable = foundSeats.reduce((result, seat) => {
      result[seat.seatNumber] = "unAvailable seat";
      return result;
    }, {});
    return res.send(seatUnAvliable);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error.", error });
  }
};

/**
 * @desc After filter avaliable seats, user select an avaliable seat and post to reserve it.
 * @route POST / api/seats
 * @access Private
 */
const postReservation = async (req, res) => {
  let { seatNumber, startTime, endTime, period } = req.body;

  // 設定startOfDay及endOfDay可避免搜尋schedule時出錯
  if (period) {
    startTime = startOfDay(startTime);
    endTime = endOfDay(endTime);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newSeat = new Seat({
      seatNumber,
      startTime,
      endTime,
      period,
      user: req.user._id,
    });

    const totalPrice = newSeat.calculatePrice();
    newSeat.price = totalPrice;

    if (req.user.wallet < totalPrice) {
      return res
        .status(400)
        .json({ message: "Remaining balance is not enough." });
    }

    req.user.wallet -= totalPrice;

    // const savedSeat = await newSeat.save({ session });
    // .populate("user")
    // .execPopulate();
    // const savedUser = await req.user.save({ session });

    await Seat.populate(newSeat, {
      path: "user",
      select: "username cardID",
    });
    const savedSeat = await newSeat.save();
    const savedUser = await req.user.save();

    // 提交Transaction
    // await session.commitTransaction();

    return res.json({
      message: "Reserved successfully",
      seatInfo: savedSeat,
      userInfo: savedUser,
    });
  } catch (error) {
    console.log(error);

    // 如果出現錯誤，回滾提交Transaction
    // await session.abortTransaction();

    return res.status(500).json({ message: "Server error.", error });
  } // finally {
  //   // 結束Transaction
  //   session.endSession();
  // }
};

module.exports = { getAvaliableSeats, postReservation };
