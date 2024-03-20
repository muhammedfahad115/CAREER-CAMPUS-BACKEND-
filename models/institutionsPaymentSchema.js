const mongoose = require('mongoose');

const institutionsPaymentSchema = new mongoose.Schema({
  amount: Number,
  razorPaymentId: String,
});

const institutionsPayment = new mongoose
    .model('institutionsPaymentCollection', institutionsPaymentSchema);

module.exports = institutionsPayment;
