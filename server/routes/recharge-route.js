const router = require("express").Router();
const passport = require("passport");
const RechargeService = require("../services/recharge-service");
const tradeInfo = require("../data/tradeInfo");
const rechargeController = require("../controllers/rechargeController");

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
  rechargeController.linepayRequest
);
router.get("/linepay/confirm", rechargeController.linepayConfirm);
router.get("/linepay/cancel", rechargeController.linepayCancel);

// ------------------------Admin------------------------
// 儲值退款
router.post(
  "/linepay/refund",
  passport.authenticate("jwt", { session: false }),
  rechargeController.linepayRefund
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
