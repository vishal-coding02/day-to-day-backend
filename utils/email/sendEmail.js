const { transporter } = require("../email/transporter");
const { Approval_Email_Template } = require("./templates/approvalTemplate");
const {
  Rejection_Email_Template,
} = require("../email/templates/rejectTemplate");
const { OTP_Email_Template } = require("./templates/otpTemplate");
const { ResetPass_OTP_Email_Template } = require("./templates/resetPassOtp");

async function sendApprovalEmail(toEmail, userName) {
  const loginLink = `${process.env.FRONTEND_URL}/login`;

  const htmlContent = Approval_Email_Template.replace(
    "{userName}",
    userName,
  ).replace(/{loginLink}/g, loginLink);

  const mailOptions = {
    sender: {
      email: process.env.SMTP_EMAIL_FROM,
      name: "ServiceHub",
    },
    to: [
      {
        email: toEmail,
        name: userName,
      },
    ],
    subject: "Your Account is Approved - Login Now",
    htmlContent: htmlContent,
  };

  try {
    await transporter.sendTransacEmail(mailOptions);
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
    userName,
  ).replace("{reason}", reason || "Not specified");

  const mailOptions = {
    sender: {
      email: process.env.SMTP_EMAIL_FROM,
      name: "ServiceHub",
    },
    to: [
      {
        email: toEmail,
        name: userName,
      },
    ],
    subject: "Application Status: Not Approved",
    htmlContent: htmlContent,
  };

  try {
    await transporter.sendTransacEmail(mailOptions);
    console.log("Rejection email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Error sending rejection email:", error);
    return false;
  }
}

async function sendOTPEmail({
  toEmail,
  userName,
  verificationCode,
  expiryMinutes = 10,
}) {
  console.log("Sending OTP email:", toEmail, userName, verificationCode);

  const htmlContent = OTP_Email_Template.replace("{userName}", userName)
    .replace("{verificationCode}", verificationCode)
    .replace("{expiryTime}", expiryMinutes);

  const mailOptions = {
    sender: {
      email: process.env.SMTP_EMAIL_FROM,
      name: "ServiceHub",
    },
    to: [
      {
        email: toEmail,
        name: userName,
      },
    ],
    subject: `Your OTP Code: ${verificationCode}`,
    htmlContent: htmlContent,
  };

  try {
    await transporter.sendTransacEmail(mailOptions);
    console.log("OTP email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}

async function sendResetPassOtpEmail({
  toEmail,
  userName,
  verificationCode,
  expiryTime,
}) {
  console.log(
    "Sending reset password OTP email:",
    toEmail,
    userName,
    verificationCode,
  );

  const htmlContent = ResetPass_OTP_Email_Template.replace(
    "{userName}",
    userName,
  )
    .replace("{verificationCode}", verificationCode)
    .replace("{expiryTime}", expiryTime);

  const mailOptions = {
    sender: {
      email: process.env.SMTP_EMAIL_FROM,
      name: "ServiceHub",
    },
    to: [
      {
        email: toEmail,
        name: userName,
      },
    ],
    subject: `Password Reset OTP: ${verificationCode}`,
    htmlContent: htmlContent,
  };

  try {
    await transporter.sendTransacEmail(mailOptions);
    console.log("Reset password OTP email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Error sending reset password OTP email:", error);
    return false;
  }
}

module.exports = {
  sendApprovalEmail,
  sendRejectionEmail,
  sendOTPEmail,
  sendResetPassOtpEmail,
};
