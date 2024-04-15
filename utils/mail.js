const nodemailer = require("nodemailer");
const helper = require("./helper");
const httpStatus = require("http-status");
const config = require("./config");

const transport = nodemailer.createTransport(config.email.smtp);

console.log(transport);
if (config.env !== "test") {
  transport
    .verify()
    .then(() => console.info("Connected to EMAIL SERVER"))
    .catch((err) => {
      console.log(err);
      console.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      );
    });
}

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, html: text };
  try {
    await transport.sendMail(msg);
  } catch (err) {
    console.log(err);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Email sending failed"
    );
  }
};

const forgotPasswordMail = async ({ emailTo, token, reason }) => {
  const options = {};
  const subject = `FORGOT PASSWORD`;
  options.title = reason;
  options.brand = "KNIT CANTEEN APP";
  options.token = `http://localhost:3000/reset-password?${token}`;
  options.expireIn = 10;
  options.username = emailTo;
  options.reason = reason;
  const text = helper.createEmailTemplate(options);
  await sendEmail(emailTo, subject, text);
};

module.exports = {
  forgotPasswordMail,
};
