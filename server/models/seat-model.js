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
  period: {
    type: [String],
    enum: ["morning", "afternoon", "evening"],
    default: [],
  },
  reservationType: {
    type: String,
    default: function () {
      return this.period.length === 0 ? "hourly" : "period";
    },
  },
  user: {
    // 用戶假設是mongodb的object
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
seatSchema.methods.calculatePrice = function () {
  const timeSlot = this.endTime.getTime() - this.startTime.getTime(); // mile seconds
  const timeSlotHR = timeSlot / (1000 * 60 * 60); // hour
  const timeSlotDate = Math.ceil(timeSlotHR / 24);

  const discounts = 0.4;
  let totalPrice;

  // 包位計算價格
  if (this.period.length !== 0) {
    const periodPrice = this.period.includes("morning")
      ? 75
      : this.period.includes("afternoon")
      ? 105
      : this.period.includes("evening")
      ? 125
      : (() => {
          throw new TypeError("Invalid period");
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
