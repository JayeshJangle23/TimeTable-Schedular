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
  } catch (err) {
    console.error("❌ Email failed:", err.response?.data || err.message);
    console.error("❌ Brevo email failed:", err.response?.data || err.message);
  }
};
