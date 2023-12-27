const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  seatNumber: {
    type: String,
    require: true,
    // 檢查長度是否為3
  },
  startTime: {
    type: Date,
    require: true,
  },
  endTime: {
    type: Date,
    require: true,
  },
  reservationType: {
    type: String,
    enum: ["hourly", "period"],
  },
  period: {
    type: String,
    require: function () {
      return reservationType === "period";
    },
    enum: ["morning", "afternoon", "evening", "hourly"], // hours到時候刪除
  },
  user: {
    // 用戶假設是mongodb的object
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  cardID: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    require: true,
    default: 20,
  },
});

// 計算價格
seatSchema.methods.calculatePrice = function (period) {
  const timeSlot = this.endTime.getTime() - this.startTime.getTime(); // mile seconds
  const timeSlotHR = Math.floor(timeSlot / (1000 * 60 * 60)); // hour
  const timeSlotDate = Math.floor(timeSlotHR / 24);

  const discounts = 0.4;
  let totalPrice;

  // 包位計算價格
  if (period !== "hourly") {
    const periodPrice =
      period === "morning"
        ? 75
        : period === "afternoon"
        ? 105
        : period === "evening"
        ? 125
        : (() => {
            throw new Error("Invalid period");
          })();
    totalPrice = periodPrice * timeSlotDate * discounts;
  } else {
    // 小時零租
    const pricePerHour = 20;
    // 超過15分鐘以1小時計算
    totalPrice =
      timeSlotHR % 1 > 0.25
        ? Math.ceil(timeSlotHR) * pricePerHour
        : Math.floor(timeSlotHR) * pricePerHour;
  }
  return totalPrice;
};

module.exports = mongoose.model("Seat", seatSchema);
