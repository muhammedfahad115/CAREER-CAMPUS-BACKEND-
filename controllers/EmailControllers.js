const nodemailer = require('nodemailer');
const MyEmail = process.env.My_Email;
const MyPassword = process.env.My_Password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${MyEmail}`,
    pass: `${MyPassword}`,
  },
});

const sendWelcomeEmail = (userName, email) => {
  const mailOptions = {
    from: `${MyEmail}`,
    to: email,
    subject: 'Welcome to CAREER&CAMPUS',
    html: `
    <html>
    <body>
      <div style="background-color: #e5e7eb; width: 100%; padding: 1rem; border-radius: 0.375rem;">
        <h1 style="color: #1e40af; font-weight: 600;">Hi ${userName},</h1>
        <p>Welcome to
          <span style="font-size: 1.875rem; font-weight: 700; color: #f59e0b;">CAREER&CAMPUS!</span>
          We're excited to have you on board.</p>
        <p>We CAREER&amp;CAMPUS provide you a better experience 
        and also a platform to make research and find a better
        career and better students.</p>
      </div>
    </body>
    </html>
      `,
  };
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.error('Error sending the mail:', error);
    } else {
      console.log('Email sented successfully:', info.response);
    }
  });
};

module.exports = {sendWelcomeEmail};

