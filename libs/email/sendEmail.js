const { transporter } = require("../email/transporter");
const { Approval_Email_Template } = require("./templates/approvalTemplate");
const { Rejection_Email_Template } = require("../email/templates/rejectTemplate");
const { OTP_Email_Template } = require("./templates/otpTemplate");

async function sendApprovalEmail(toEmail, userName) {
  const loginLink = "https://day-to-day-frontend.vercel.app/login";

  const htmlContent = Approval_Email_Template.replace(
    "{userName}",
    userName
  ).replace("{loginLink}", loginLink);

  const mailOptions = {
    from: process.env.SMTP_EMAIL_FROM,
    to: toEmail,
    subject: "Your Account is Approved - Login Now",
    text: `Hello ${userName},\n\nYour provider account has been approved. You can now login and start accepting service requests.\n\nLogin here: ${loginLink}\n\nBest regards,\nYourService Team`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Approval email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Error sending approval email:", error);
    return false;
  }
}

async function sendRejectionEmail(toEmail, userName, reason) {
  const htmlContent = Rejection_Email_Template.replace(
    "{userName}",
    userName
  ).replace("{reason}", reason || "Not specified");

  const mailOptions = {
    from: process.env.SMTP_EMAIL_FROM,
    to: toEmail,
    subject: "Application Status: Not Approved",
    text: `Dear ${userName},\n\nReason: ${reason}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Rejection email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Error sending rejection email:", error);
    throw new Error("Email sending failed"); 
  }
}

async function sendOTPEmail({
  toEmail,
  userName,
  verificationCode,
  expiryMinutes = 10,
}) {
  console.log(toEmail, userName, verificationCode);
  const htmlContent = OTP_Email_Template.replace("{userName}", userName)
    .replace("{verificationCode}", verificationCode)
    .replace("{expiryTime}", expiryMinutes);

  const mailOptions = {
    from: process.env.SMTP_EMAIL_FROM,
    to: toEmail,
    subject: `Your OTP Code: ${verificationCode} - Valid for ${expiryMinutes} minutes`,
    text: `Hello ${userName},\n\nYour One-Time Password (OTP) for email verification is:\n\n${verificationCode}\n\nThis code will expire in ${expiryMinutes} minutes.\n\nEnter this code on the verification page to complete your registration.\n\nNever share this OTP with anyone.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nYourService Team`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}

module.exports = { sendApprovalEmail, sendRejectionEmail, sendOTPEmail };
