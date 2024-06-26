require("dotenv").config({ path: `${__dirname}/../.env` });

module.exports = {
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT,
  mongourl: process.env.MONGODB_URL,

  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    secure: false,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
};
