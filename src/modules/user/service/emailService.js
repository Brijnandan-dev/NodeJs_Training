const nodemailer = require('nodemailer'); //to handle logic related to mails
const { MAIN_ROUTE } = require('../../../../constants/constants');
require('dotenv').config();

const sendVerificationEmail = async (useremail, verification_token, route) => {
  //This would set up a connections on gmail server.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_SENT_FROM, //validate it for no-reply use******
      pass: process.env.MAIL_PASSWORD, //app password created
    },
  });

  const linkToVisit = `${MAIN_ROUTE}${route}/${verification_token}`;

  await transporter.sendMail({
    from: 'node user registration app',
    to: useremail,
    subject: 'Verify you Email',
    text: `Please visit on following link to successfully verify youself ${linkToVisit}`,
  });
};

module.exports = { sendVerificationEmail };
