// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = function getOtp(number) {
  client.verify.v2.services('VAe74064b2a86e27a38b0f7371543b2f02')
      .verifications
      .create({to: `+91${number}`, channel: 'sms'})
      .then((verification) => console.log(verification.status));
};
