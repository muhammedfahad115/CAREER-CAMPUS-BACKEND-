const Razorpay = require('razorpay');
const RazorPay_Key_ID = process.env.Razor_Pay_KeyId;
const RazorPay_Key_Secret = process.env.Razor_Pay_KeySecretId;

const razorPay = new Razorpay({
  key_id: RazorPay_Key_ID,
  key_secret: RazorPay_Key_Secret,
});

const creatRazorPayOrder = async (amount) => {
  const order = await razorPay.orders.create({
    amount: amount,
    currency: 'INR',
  });
  return order;
};

module.exports = {
  creatRazorPayOrder,
};
