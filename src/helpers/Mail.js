const transporter = require("../config/nodeMailer");
// ---------------------------------------------
const SendResetPasswordLink =async (email, token) => {
  const mailOptions = {
    to: email,
    subject: "Reset password instructions",
    html: `http://localhost:3000/auth/reset-password/${token}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log("########################################################");
      console.log(error);
    } else {
      console.log("Message sent!");
    }
  });
};
// ---------------------------------------------
const sendAcount = (user) => {
  const mailOptions = {
    to: user.email,
    subject: "acount login",
    html: `your email is ${user.email} and password is : ${user.password}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log("########################################################");
      console.log(error);
    } else {
      console.log("Message sent!");
    }
  });
};
module.exports = {SendResetPasswordLink,sendAcount};
