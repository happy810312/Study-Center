const Order = require("../models").order;
const User = require("../models").user;
const RechargeService = require("../services/recharge-service");

/**
 * @desc Send payment request to linepay server
 * @route POST / api/recharge/linepay
 * @access Private
 */
const linepayRequest = async (req, res) => {
  const { amount } = req.body;
  try {
    const response = await RechargeService.createOrder(amount, req.user);

    if (response?.linePayResponse?.data?.returnCode !== "0000") {
      return res.status(400).json({
        message: `錯誤代碼${response?.linePayResponse?.data?.returnCode}`,
      });
    }

    // return Linepay付款頁面網址，交給前端導向
    return res.json({
      url: response?.linePayResponse?.data?.info?.paymentUrl?.web,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Internal server error. Please try again later or contact support.",
      error: error,
    });
  }
};

/**
 * @desc login linepay and comfirm the order payment
 * @route POST / api/recharge/linepay/confirm
 * @access Public
 */
const linepayConfirm = async (req, res) => {
  const { transactionId, orderId } = req.query;
  try {
    // 抓訂單交易金額
    const foundOrder = await Order.findOne({ orderId }).exec();
    if (!foundOrder)
      return res.status(500).json({ message: "Order not found!" });

    const response = await RechargeService.confirmOrder(
      foundOrder.amount,
      transactionId
    );
    if (response?.data?.returnCode !== "0000") {
      return res.status(400).json({
        message: `錯誤代碼${response?.linePayResponse?.data?.returnCode}`,
      });
    }
    // 透過orderId從資料庫中找到使用者，新增transactionId
    // 調整status改成success
    const updateOrder = await Order.findOneAndUpdate(
      { orderId },
      { transactionId, orderStatus: "success" },
      { new: true }
    );

    // 透過orderId從資料庫中到使用者，更新金額
    const { user, amount } = updateOrder;

    // 更新金額
    await User.aggregate([
      {
        $match: { _id: user },
      },
      {
        $set: { wallet: { $add: ["$wallet", amount] } },
      },
      {
        $merge: {
          into: "users",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
    ]);
    res.redirect(`${process.env.FRONT_URL || "http://localhost:3000"}/profile`);
  } catch (error) {
    return res.status(500).json({
      message:
        "Internal server error. Please try again later or contact support.",
      error: error,
    });
  }
};

/**
 * @desc login linepay and cancel the order payment
 * @route POST / api/recharge/linepay/cancel
 * @access Public
 */
const linepayCancel = async (req, res) => {
  const { orderId } = req.query;

  try {
    const foundOrder = Order.findOne({ orderId }).exec();
    if (!foundOrder) {
      return res.status(400).json({ message: "Order not found." });
    }

    const removeOrder = await foundOrder.remove();
    return res.json({ removeOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error });
  }
};

/**
 * @desc Only admin can use this refund route
 * @route POST / api/recharge/linepay/refund
 * @access Private
 */
const linepayRefund = async (req, res) => {
  const { transactionId } = req.body;
  const foundOrder = await Order.findOne({ transactionId }).exec();

  if (!foundOrder) {
    return res.status(400).json({ message: "Order not found." });
  }

  // 確認執行退款動作的人是否為admin
  if (!req.user.isAdmin()) {
    return res.status(403).json({ message: "Invalid role." });
  }

  if (!/^[0-9]{19}$/.test(transactionId)) {
    return res.status(400).json({ message: "Invalid transactionId format." });
  }

  const { amount, user } = foundOrder;

  const refundOrder = await RechargeService.refundRechargeOrder(
    amount,
    transactionId
  );

  if (refundOrder.data.returnCode !== "0000") {
    return res.status(400).json({
      message: `錯誤代碼${response?.linePayResponse?.data?.returnCode}`,
    });
  }

  // 減少wallet的金額 => linepay成功後移除儲值金額
  await RechargeService.reduceWalletMoney(amount, user);

  // update order
  foundOrder.orderStatus = "refund";
  foundOrder.refundTransactionId = refundOrder.data.info.refundTransactionId;
  foundOrder.refundAt = refundOrder.data.info.refundTransactionDate;
  const updateOrder = await foundOrder.save();

  return res.json({
    updateOrder,
    message: {
      orderStatus: "refund",
      refundTransactionId: refundOrder.data.info.refundTransactionId,
      returnMessage: refundOrder.data.returnMessage,
    },
  });
};

module.exports = {
  linepayRequest,
  linepayConfirm,
  linepayCancel,
  linepayRefund,
};
