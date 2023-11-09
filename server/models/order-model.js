const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    require: true,
  },
  productID: {
    type: String,
    require: true,
  },
  transactionId: {
    type: String,
  },
  amount: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    enum: ["success", "refund", "pending"],
    require: true,
    default: "pending",
  },
  refundTransactionId: {
    type: String,
    require: function () {
      return OrderStatus === "refund";
    },
  },
  refundAt: {
    type: Date,
    require: function () {
      return OrderStatus === "refund";
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
