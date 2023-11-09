const mongoose = require("mongoose");
const axios = require("axios");
const { isFuture, isAfter } = require("date-fns");
const router = require("express").Router();
const Seat = require("../models").seat;
const passport = require("passport");
const seatValidation = require("../validation").seatValidation;

const USER_API_URL = "http://localhost:8080/api/user";

router.use((req, res, next) => {
  console.log("正在接收一個request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("正在接收一個schedule api...");
});

// 獲取的資料的分頁middleware
const paginateData = (foundData) => {
  return (req, res, next) => {
    const { page, items } = req.query;
    const itemsPerPage = parseInt(items, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage - 1;
    const foundDataLength = foundData.length;
    const dataToDisplay = foundData.slice(startIndex, endIndex + 1);
    res.locals.paginateData = {
      dataToDisplay: dataToDisplay,
      dataLength: Array.from(
        { length: foundDataLength },
        (_, index) => index + 1
      ),
    };
    next();
  };
};

// 以使用者id查詢過往所有預約座位，回傳部分頁面資料
router.get(
  "/",
  async (req, res, next) => {
    const { _id } = req.user._id;
    try {
      const foundSchedules = await Seat.find({ user: _id });
      //   const reversedFoundSchedules = foundSchedules.toReversed();
      console.log(Array.isArray(foundSchedules));
      paginateData(foundSchedules)(req, res, next);
    } catch (e) {
      return res.status(500).send(e);
    }
  },
  (req, res) => {
    const displayData = res.locals.paginateData; // array.
    return res.send(displayData);
  }
);

// 過往所有預約座位，回傳金額、項目數、頁數
router.get("/allCount", async (req, res) => {
  const { _id } = req.user._id;
  const { items } = req.query;
  const itemsPerPage = parseInt(items, 10) || 10;

  try {
    const foundSchedules = await Seat.find({ user: _id });
    const totalItems = foundSchedules.length; // 所有資料的長度
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 總共頁數

    // 計算total Donate金額
    let totalDonate = 0;
    for (let i = 0; i < totalItems; i++) {
      totalDonate += foundSchedules[i].price;
    }
    const totalCount = {
      totalItems: totalItems,
      totalPages: totalPages,
      totalDonate: totalDonate,
    };
    return res.send(totalCount);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 指定區間預約座位，回傳金額、項目數、頁數
router.get("/dateRangeCount", async (req, res) => {
  const { _id } = req.user._id;
  const { startDate, endDate } = req.query;

  // 檢查日期字符串是否有效
  const parsedStartDate = Date.parse(startDate);
  const parsedEndDate = Date.parse(endDate);

  if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
    return res.status(400).send({ msg: "Invalid date format." });
  }

  try {
    const foundSchedules = await Seat.find({
      user: _id,
      $or: [
        { startTime: { $gte: startDate, $lte: endDate } },
        { startDate: { $gte: startDate, $lte: endDate } },
      ],
    }).exec();
    const totalItems = foundSchedules.length; // 所有資料的長度
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 總共頁數

    // 計算total Donate金額
    let totalDonate = 0;
    for (let i = 0; i < totalItems; i++) {
      totalDonate += foundSchedules[i].price;
    }
    const totalCount = {
      totalItems: totalItems,
      totalPages: totalPages,
      totalDonate: totalDonate,
    };
    return res.send(totalCount);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 指定日期查詢特定使用者id的預約座位情形
router.get("/dateRange", async (req, res) => {
  const { startDate, endDate, items } = req.query;
  const { _id } = req.user;
  const itemsPerPage = parseInt(items, 10) || 10;
  //   console.log(_id);
  console.log(startDate);
  console.log(endDate);

  // 檢查日期字符串是否有效
  const parsedStartDate = Date.parse(startDate); // 1695999959000
  const parsedEndDate = Date.parse(endDate); // 1696003559000

  if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
    return res.status(400).send({ msg: "Invalid date format." });
  }

  if (isAfter(parsedStartDate, parsedEndDate)) {
    return res.status(404).send({
      msg: "Invalid date format, start time should be earlier than end time.",
    });
  }

  try {
    const foundSchedules = await Seat.find({
      // id相符
      // startTime和endTime在輸入的區間內
      // startDate和endDate在輸入的缺間內
      user: _id,
      $or: [
        { startTime: { $gte: startDate, $lte: endDate } },
        { startDate: { $gte: startDate, $lte: endDate } },
      ],
    }).exec();
    return res.send(foundSchedules);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 刪除預約
router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const orderObjectId = new mongoose.Types.ObjectId(orderId);

  if (!mongoose.Types.ObjectId.isValid(orderObjectId)) {
    return res.status(400).send({ error: "Invalid orderId" });
  }

  // 驗證刪除時間是否大於預約時間
  try {
    const foundOrder = await Seat.findOne({ _id: orderId });
    console.log("foundOrder:" + foundOrder);
    const orderStartTime = new Date(foundOrder.startTime);
    console.log("isFuture:" + isFuture(orderStartTime));

    if (isFuture(orderStartTime)) {
      try {
        console.log("if statement...");
        const deletedOrder = await Seat.findOneAndDelete({
          _id: orderObjectId,
        });

        if (!deletedOrder) {
          return res.send({ error: "Order not found" });
        }

        // 刪除成功後api recharge route
        axios
          .patch(`${USER_API_URL}/deposit/${foundOrder.user}`, {
            newDeposit: foundOrder.price,
          })
          .then((response) => {
            console.log("Order recharge successfully");
          });

        return res
          .status(200)
          .send({ deletedOrder, message: "Order deleted successfully" });
      } catch (e) {
        return res.status(500).send(e);
      }
    } else {
      return res
        .status(403)
        .send({ foundOrder, message: "Session has started" });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});
// 以座位號碼查詢使用資訊 => 用在admin dashboard
module.exports = router;
