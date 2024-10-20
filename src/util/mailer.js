const nodemailer = require("nodemailer");

const sendMail = async ({ auth, options }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth,
  });

  return await transporter.sendMail(options);
};

module.exports = sendMail;
