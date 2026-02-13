// const nodemailer = require("nodemailer");

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.BREVO_USER,
//     pass: process.env.BREVO_PASS,
//   },
// });
const axios = require("axios");

exports.sendEmail = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Task Reminder",
          email: "jayeshjangle1723@gmail.com", // verified sender
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    console.log("📨 Brevo response:", response.data);
    console.log("📤 Email API accepted for:", to);

    console.log("📤 Email sent to:", to);
  } catch (err) {
    console.error("❌ Email failed:", err.response?.data || err.message);
    console.error("❌ Brevo email failed:", err.response?.data || err.message);
  }
};
