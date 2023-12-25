const mongoose = require("mongoose");
const Seat = require("../models").seat;
const User = require("../models").user;

/**
 * @desc Search reservations between specific date range by user id
 * @route GET / api/schedule?startDate&endDate
 * @access Private
 */
const getSchedules = async (req, res) => {
  const { startDate, endDate, page, items } = req.query;
  const { _id } = req.user;

  // 檢查日期字符串是否有效
  const parsedStartDate = Date.parse(startDate); // 1695999959000
  const parsedEndDate = Date.parse(endDate); // 1696003559000

  if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
    return res.status(400).json({ message: "Invalid date format." });
  }

  // 檢查開始日期是否早於結束日期
  if (parsedStartDate > parsedEndDate) {
    return res.status(404).json({
      message:
        "Invalid date format, start time should be earlier than end time.",
    });
  }

  // 檢查page跟items是否為整數且大於0
  const isValidPositiveInteger = (value) => {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) && intValue > 0;
  };

  if (!isValidPositiveInteger(page) || !isValidPositiveInteger(items)) {
    return res.status(400).json({ message: "Invalid page or items value." });
  }

  try {
    const query = {
      user: _id,
      startTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
    const [totalDocuments, totalDonate, foundSchedules] = await Promise.all([
      Seat.countDocuments(query),
      Seat.aggregate([
        { $match: query },
        { $group: { _id: "$null", total: { $sum: "$price" } } },
        { $project: { _id: 0, total: 1 } },
      ]),
      Seat.aggregate([
        { $match: query },
        { $sort: { startTime: -1 } },
        { $skip: (parseInt(items) || 10) * (parseInt(page) - 1 || 0) },
        { $limit: parseInt(items) || 10 },
      ]),
    ]);
    return res.json({ totalDocuments, totalDonate, foundSchedules });
  } catch (error) {
    return res.status(500).json({ message: "Server invalid.", error });
  }
};

/**
 * @desc Delete reservations by user id
 * @route DELETE / api/schedule/:orderId
 * @access Private
 */
const deleteSchedules = async (req, res) => {
  const { orderId } = req.query;
  const { _id, wallet } = req.user;
  const orderObjectId = new mongoose.Types.ObjectId(orderId);

  if (!mongoose.Types.ObjectId.isValid(orderObjectId)) {
    return res.status(400).json({ message: "Invalid orderId" });
  }

  // 牽涉到刪除訂單及退款，所以用session保證同步
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 驗證刪除時間是否大於預約時間
    const foundOrder = await Seat.aggregate([
      {
        $facet: {
          pastOrder: [
            {
              $match: {
                _id: new mongoose.Types.ObjectId(orderId), // 不知道為什麼直接使用orderId不行
                startTime: { $lte: new Date() },
              },
            },
            { $limit: 1 },
          ],
          futureOrder: [
            {
              $match: {
                _id: new mongoose.Types.ObjectId(orderId), // // 不知道為什麼直接使用orderId不行
                startTime: { $gt: new Date() },
              },
            },
            { $limit: 1 },
          ],
        },
      },
    ]);

    console.log(foundOrder);

    const { pastOrder, futureOrder } = foundOrder[0];

    if (pastOrder.length > 0) {
      return res.status(400).json({
        message: "The order start time cannot be less than or equal to today.",
      });
    }
    if (futureOrder.length > 0) {
      const deletedOrder = await Seat.findOneAndDelete(
        { _id: orderObjectId },
        { session }
      );
      // 直接透過user id及deletedOrder金額退款給user
      const newWallet = await User.findOneAndUpdate(
        { _id },
        { $set: { wallet: wallet + futureOrder.price } },
        { new: true }
      );
      // 提交Transaction
      await session.commitTransaction();

      return res.json({
        deletedOrder,
        newWallet,
        message: "Order is deleted successfully.",
      });
    }

    return res.status(400).json({ message: "There are no matching orders." });
  } catch (error) {
    // 如果出現錯誤，回滾提交Transaction
    await session.abortTransaction();

    return res.status(500).json({ message: "Server error occurred.", error });
  } finally {
    // 結束Transaction
    session.endSession();
  }
};

module.exports = { getSchedules, deleteSchedules };
