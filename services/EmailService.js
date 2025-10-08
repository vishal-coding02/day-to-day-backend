const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendApprovalEmail(toEmail, userName) {
  const mailOptions = {
    from: process.env.SMTP_EMAIL_FROM,
    to: toEmail,
    subject: "Your Account is Approved",
    text: `Hello ${userName}, your account has been approved.`,
    html: `<strong>Hello ${userName},</strong><br/>Your account has been <span style="color:green;">approved</span>.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function sendRejectionEmail(toEmail, userName, reason) {
  const mailOptions = {
    from: process.env.SMTP_EMAIL_FROM,
    to: toEmail,
    subject: "Your Account Has Been Rejected",
    text: `Hello ${userName}, your account has been rejected. Reason: ${reason}`,
    html: `
      <strong>Hello ${userName},</strong><br/>
      Your account has been <span style="color:red;">rejected</span>.<br/>
      <br/>
      <strong>Reason:</strong> ${reason}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Rejection email sent successfully");
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
}

module.exports = { sendApprovalEmail, sendRejectionEmail };
