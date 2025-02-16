const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendInvoiceEmail = async (userEmail, invoicePath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your Invoice",
      text: "Please find your invoice attached.",
      attachments: [
        {
          filename: "invoice.pdf",
          path: invoicePath,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully. Message ID:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendInvoiceEmail };