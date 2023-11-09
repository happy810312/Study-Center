const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  seatNumber: {
    type: String,
    require: true,
    // 檢查長度是否為3
  },
  startTime: {
    type: Date,
    require: function () {
      return !startDate && !endDate && !period;
    },
  },
  endTime: {
    type: Date,
    require: function () {
      return !startDate && !endDate && !period;
    },
  },
  startDate: {
    type: Date,
    require: function () {
      return !startTime && !endTime;
    },
  },
  endDate: {
    type: Date,
    require: function () {
      return !startTime && !endTime;
    },
  },
  period: {
    type: String,
    require: function () {
      return !startTime && !endTime;
    },
    enum: ["morning", "afternoon", "evening", "hours"],
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

// // 各時段的價格
// seatSchema.virtual("price").get(function () {
//   if (this.usageTime == "morning") {
//     return 75;
//   } else if (this.usageTime == "afternoon") {
//     return 105;
//   } else if (this.usageTime == "evening") {
//     return 125;
//   }
// });

// 計算價格 => 感覺要寫在前端
seatSchema.methods.calculatePrice = function () {
  const pricePerHour = 20;
  const timeSlot = this.endTime.getTime() - this.startTime.getTime(); // mile seconds
  const timeSlotHR = timeSlot / (1000 * 60 * 60); // hour
  // 超過15分鐘以1小時計算
  const totalPrice =
    timeSlotHR % 1 > 0.25
      ? Math.ceil(timeSlotHR) * pricePerHour
      : Math.floor(timeSlotHR) * pricePerHour;

  return totalPrice;
};

module.exports = mongoose.model("Seat", seatSchema);
