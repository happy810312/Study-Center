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
    enum: ["morning", "afternoon", "evening", "hours"], // hours到時候刪除
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

// 各時段的價格
// seatSchema.virtual("price").get(function () {
//   if (reservationType !== "period") return;

//   if (this.period == "morning") {
//     return 75;
//   } else if (this.period == "afternoon") {
//     return 105;
//   } else if (this.period == "evening") {
//     return 125;
//   }
// });

// 計算價格
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
