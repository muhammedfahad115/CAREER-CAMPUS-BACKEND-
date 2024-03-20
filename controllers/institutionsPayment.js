const Razorpay = require('razorpay');
const RazorPay_Key_ID = process.env.Razor_Pay_KeyId;
const RazorPay_Key_Secret = process.env.Razor_Pay_KeySecretId;
const RazorPayment = require('../controllers/utilities/RazorPayment');
const InstitutionsPayment = require('../models/institutionsPaymentSchema');

const paymentObject = {
  postPaymentObject: async (req, res) =>{
    const {amount} = req.body;
    console.log(amount);
    try {
      const razorPay = new Razorpay({
        key_id: RazorPay_Key_ID,
        key_secret: RazorPay_Key_Secret,
      });
      const order = await RazorPayment.creatRazorPayOrder(amount);
      const newOrder = new InstitutionsPayment({
        amount: amount,
        razorPaymentId: order.id,
      });
      await newOrder.save();
      if (newOrder) {
        res.status(200)
            .json({message: 'Payment is successfull', orderId: order.id});
      }
    } catch (error) {
      console.log(error);
      if (error) {
        res.status(500).json({error: 'Internal Server Error', error});
      }
    }
  },
};

module.exports = paymentObject;
