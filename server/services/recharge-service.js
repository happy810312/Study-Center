const axios = require("axios");
const crypto = require("crypto");
const Base64 = require("crypto-js/enc-base64");
const priceData = require("../data/priceData");
const tradeInfo = require("../data/tradeInfo");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Order = require("../models/order-model");
const { getTime } = require("date-fns");

const LINEPAY_SITE = process.env.LINEPAY_SITE;
const LINEPAY_CHANNEL_ID = process.env.LINEPAY_CHANNEL_ID;
const LINEPAY_CHANNEL_SECRET_KEY = process.env.LINEPAY_CHANNEL_SECRET_KEY;

const NEWEBPAY_SITE = process.env.NEWEBPAY_SITE;
const NEWEBPAY_VERSION = process.env.NEWEBPAY_VERSION;
const NEWEBPAY_MERCHANTID = process.env.NEWEBPAY_MERCHANTID;
const NEWEBPAY_HASHKEY = process.env.NEWEBPAY_HASHKEY;
const NEWEBPAY_HASHIV = process.env.NEWEBPAY_HASHIV;

class RechargeService {
  // Line Pay API
  createSignature(uri, amount, linePayBody) {
    const nonce = parseInt(new Date().getTime() / 1000);
    const signatureStr = `${LINEPAY_CHANNEL_SECRET_KEY}${uri}${JSON.stringify(
      linePayBody
    )}${nonce}`;
    const signature = Base64.stringify(
      hmacSHA256(signatureStr, LINEPAY_CHANNEL_SECRET_KEY)
    );
    // console.log(signature);
    const headers = {
      "Content-Type": "application/json",
      "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
      "X-LINE-Authorization-Nonce": nonce,
      "X-LINE-Authorization": signature,
    };
    // console.log(headers);
    return headers;
  }
  async createOrder(amount, user) {
    try {
      const userID = user._id;
      const orderId = parseInt(new Date().getTime() / 1000);
      const orderExist = await Order.findOne({ orderId });

      if (orderExist) {
        return { msg: "OrderID is existed" };
      }

      // 訂單寫入資料庫 => 取消在移除
      const newOrder = new Order({
        orderId: orderId,
        productID: priceData(amount).packages[0].id,
        amount: amount,
        user: userID,
      });
      const orderSaved = await newOrder.save();

      // Line Pay 部分
      const uri = "/v3/payments/request";
      const linePayBody = {
        ...priceData(amount),
        orderId: orderId,
        redirectUrls: {
          confirmUrl: `${process.env.RECHARGE_API_URL}/linePay/confirm`,
          cancelUrl: `${process.env.RECHARGE_API_URL}/linePay/cancel`,
        },
      };
      const headers = this.createSignature(uri, amount, linePayBody);
      const linePayResponse = await axios.post(
        `${LINEPAY_SITE}/v3/payments/request`,
        linePayBody,
        {
          headers: headers,
        }
      );

      return {
        orderSaved,
        msg: "Order is created successfully",
        linePayResponse,
      };
    } catch (e) {
      return e;
    }
  }
  confirmOrder(amount, transactionId) {
    const uri = `/v3/payments/${transactionId}/confirm`;
    const linePayBody = {
      amount: amount,
      currency: "TWD",
    };
    const headers = this.createSignature(uri, amount, linePayBody);
    return axios.post(`${LINEPAY_SITE}${uri}`, linePayBody, {
      headers: headers,
    });
  }

  // 包位退款
  refundPeriodOrder(startTime, endTime, amount, transactionId) {
    const uri = `/v3/payments/${transactionId}/refund`;
    const dateDistanceToNow = Math.ceil(
      (getTime(new Date()) - getTime(new Date(startTime))) / 86400000
    );
    const dateDistanceToEnd = Math.ceil(
      (getTime(new Date(endTime)) - getTime(new Date(startTime))) / 86400000
    );
    const refundBody = {
      // refundAmount === "" => refund all
      // refund = 以使用天數比例分配 => 1 - ((今天時間-開始時間) / (結束時間-開始時間))  *  amount
      refundAmount: (1 - dateDistanceToNow / dateDistanceToEnd) * amount,
    };
    const headers = this.createSignature(uri, amount, refundBody);
    return axios.post(`${LINEPAY_SITE}${uri}`, refundBody, {
      headers: headers,
    });
  }
  // 儲值退款 => 只退款7成
  refundRechargeOrder(amount, transactionId) {
    const uri = `/v3/payments/${transactionId}/refund`;
    const refundBody = {
      // 退款7成
      // refundAmount: amount * 0.7,
    };
    const headers = this.createSignature(uri, amount, refundBody);
    return axios.post(`${LINEPAY_SITE}${uri}`, refundBody, {
      headers: headers,
    });
  }

  // wallet 扣款service
  reduceWalletMoney(amount, userId) {
    return axios.patch(`${process.env.USER_API_URL}/deposit/${userId}`, {
      newDeposit: -amount,
    });
  }

  // Neweb Pay API => 沒有有效的HASH KEY & HASH IV => 暫時無法串接
  // 字串組合
  createDataChain(order) {
    return `MerchantID=${order.MerchantID}&RespondType=${
      order.RespondType
    }&TimeStamp=${order.TimeStamp}&Version=${order.Version}&LangType=${
      order.LangType
    }&MerchantOrderNo=${order.MerchantOrderNo}&Amt=${
      order.Amt
    }&ItemDesc=${encodeURIComponent(order.ItemDesc)}&TradeLimit=${
      order.TradeLimit
    }&ReturnURL=${encodeURIComponent(
      order.ReturnURL
    )}&NotifyURL=${encodeURIComponent(order.NotifyURL)}`;
  }
  // AES加密
  createAesEncrpt(TradeInfo) {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      NEWEBPAY_HASHKEY,
      NEWEBPAY_HASHIV
    );
    let encryptedAesData = cipher.update(
      this.createDataChain(TradeInfo),
      "utf8",
      "hex"
    );
    encryptedAesData += cipher.final("hex");
    return encryptedAesData;
  }

  // SHA256加密
  createSHA256Encrpt(aesEncrpt) {
    const plainText = `HashKey=${NEWEBPAY_HASHKEY}&${aesEncrpt}&HashIV=${NEWEBPAY_HASHIV}`;
    const sha = crypto.createHash("sha256");
    const encryptedSHAData = sha
      .update(plainText, "utf8")
      .digest("hex")
      .toUpperCase();
    return encryptedSHAData;
  }

  createShaOrder(aesEncrpt, shaEncrpt) {
    const newebPayBody = {
      MerchantID: NEWEBPAY_MERCHANTID,
      TradeInfo: aesEncrpt,
      TradeSha: shaEncrpt,
      Version: NEWEBPAY_VERSION,
    };
    return axios.post(`${NEWEBPAY_SITE}`, newebPayBody);
  }
}

module.exports = new RechargeService();
