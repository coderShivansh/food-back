const pug = require("pug");

// const isPasswordMatched = async (password, hashedPassword) => {
//   return bcrypt.compare(password, hashedPassword);
// };

const generateToken = () => {
  return Math.random().toString(36).substr(2);
};

const generateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

const getMailTemplateFile = ({ token, welcome, plan, coupon }) => {
  // if (token) return `${__dirname}/../views/forgot-password.pug`;
  return `${__dirname}/../views/forgot-password.pug`;
};

const createEmailTemplate = ({
  title,
  token,
  reason,
  expireIn,
  brand,
  logo,
  username,
  url,
  welcome,
  year,
  plan,
  coupon,
}) => {
  const selectFile = getMailTemplateFile({ token, welcome, plan, coupon });

  const html = pug.compileFile(selectFile)({
    title,
    token,
    reason,
    expireIn,
    brand,
    logo,
    username,
    url,
    year,
    plan,
    coupon,
  });

  return html;
};

module.exports = {
  generateOtp,
  createEmailTemplate,
  generateToken,
};
