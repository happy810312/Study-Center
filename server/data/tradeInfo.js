const tradeInfo = (amount) => {
  return {
    MerchantID: process.env.NEWEBPAY_MERCHANTID,
    RespondType: "JSON",
    TimeStamp: new Date().getTime(),
    Version: process.env.NEWEBPAY_VERSION,
    LangType: "en",
    MerchantOrderNo: parseInt(new Date().getTime() / 1000),
    Amt: amount,
    ItemDesc: "Recharge",
    TradeLimit: 300,
    ReturnURL: process.env.NEWEBPAY_RETURNURL,
    NotifyURL: process.env.NEWEBPAY_NOTIFYURL,
  };
};

module.exports = tradeInfo;
