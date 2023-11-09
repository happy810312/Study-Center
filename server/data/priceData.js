const rechargeOrders = (amount) => {
  return {
    amount: amount,
    currency: "TWD",
    packages: [
      {
        id: "Product_1",
        amount: amount,
        products: [{ name: `Recharge ${amount}`, quantity: 1, price: amount }],
      },
    ],
  };
};

module.exports = rechargeOrders;
