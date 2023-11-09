const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");
const User = require("../models").user;
const Order = require("../models").order;
const RechargeService = require("../services/recharge-service");
const priceData = require("../data/priceData");
const tradeInfo = require("../data/tradeInfo");

router.use((req, res, next) => {
  console.log("正在接收Auth route的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

// ---------------Line Pay API---------------
router.post(
  "/linepay",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { amount } = req.body;
    try {
      const response = await RechargeService.createOrder(amount, req.user);
      // console.log(response?.data?.info?.transactionId); // UUID

      if (response?.linePayResponse?.data?.returnCode === "0000") {
        // console.log(response);
        // 回膗Linepay付款確認頁面，交給前端導向
        return res.send(response?.linePayResponse?.data?.info?.paymentUrl?.web);
      }
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

router.get("/linepay/confirm", async (req, res) => {
  const { transactionId, orderId } = req.query;
  try {
    const response = await RechargeService.confirmOrder(500, transactionId);
    if (response?.data?.returnCode === "0000") {
      // 透過orderId從資料庫中找到使用者，新增transactionId
      // 調整status改成success
      await Order.findOneAndUpdate(
        { orderId },
        { transactionId, orderStatus: "success" },
        { new: true }
      );
      // 透過orderId從資料庫中到使用者，更新金額
      const foundOrderId = await Order.findOne({ orderId });
      const { user } = foundOrderId;
      const { amount } = response.data.info.payInfo[0];

      // 更新金額
      const handleRecharge = await axios.patch(
        `${process.env.USER_API_URL}/deposit/${user}`,
        { newDeposit: amount }
      );
      if (handleRecharge) {
        res.redirect(`${process.env.FRONT_URL}/profile`);
      }
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/linepay/cancel", async (req, res) => {
  const { orderId } = req.query;

  const foundOrder = Order.findOne({ orderId }).exec();
  if (!foundOrder) {
    return res.status(400).send({ msg: "Order not found." });
  }

  const removeOrder = foundOrder.remove();
  console.log(removeOrder);
});

// ------------------------Admin------------------------
// 儲值退款
router.post(
  "/linepay/wallet/refund",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { transactionId } = req.body;

    // 確認執行退款動作的人是否為admin
    if (!req.user.isAdmin()) {
      return res.status(400).send({ msg: "Invalid role." });
    }

    const rule = /^[0-9]{19}$/;
    if (!rule.test(transactionId)) {
      return res.status(400).send({ msg: "Invalid transactionId format." });
    }

    const foundOrder = await Order.findOne({ transactionId }).exec();
    if (!foundOrder) {
      return res.status(400).send({ msg: "Order not found." });
    }
    const { amount, user } = foundOrder;

    const refundOrder = await RechargeService.refundRechargeOrder(
      amount,
      transactionId
    );

    if (refundOrder.data.returnCode !== "0000") {
      return res.status(400).send(refundOrder.data.returnMessage);
    }

    // if returnCode === 0000 =>

    // 減少wallet的金額 => linepay成功後移除儲值金額
    const reduceWalletMoney = await RechargeService.reduceWalletMoney(
      amount,
      user
    );

    // update order
    foundOrder.orderStatus = "refund";
    foundOrder.refundTransactionId = refundOrder.data.info.refundTransactionId;
    foundOrder.refundAt = refundOrder.data.info.refundTransactionDate;
    const updateOrder = await foundOrder.save();

    return res.send({
      updateOrder,
      msg: {
        orderStatus: "refund",
        refundTransactionId: refundOrder.data.info.refundTransactionId,
        returnMessage: refundOrder.data.returnMessage,
      },
    });
  }
);

// ---------------Neweb Pay API---------------
router.post("/newebpay", async (req, res) => {
  const { amount } = req.body;
  const tradeInfoChain = RechargeService.createDataChain(tradeInfo(amount));
  const aesEncrpt = RechargeService.createAesEncrpt(tradeInfoChain);
  const shaEncrpt = RechargeService.createSHA256Encrpt(aesEncrpt);
  const response = await RechargeService.createShaOrder(aesEncrpt, shaEncrpt);
  return res.send(response);
});

module.exports = router;
