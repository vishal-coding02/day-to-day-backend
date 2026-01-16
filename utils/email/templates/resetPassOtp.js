// email-service.js
const ResetPass_OTP_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background: #3b82f6;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .content {
            padding: 40px;
            color: #333;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
        }
        
        .user-name {
            color: #3b82f6;
            font-weight: bold;
        }
        
        .otp-box {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
        }
        
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 10px;
            color: #3b82f6;
            margin: 15px 0;
            font-family: monospace;
        }
        
        .note {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400e;
        }
        
        .footer {
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ServiceHub</div>
            <p>Password Reset OTP</p>
        </div>
        
        <div class="content">
            <p class="greeting">Hello <span class="user-name">{userName}</span>,</p>
            
            <p>Your OTP for password reset is:</p>
            
            <div class="otp-box">
                <div class="otp-code">{verificationCode}</div>
                <p>This OTP is valid for {expiryTime} minutes</p>
            </div>
            
            <div class="note">
                <strong>Security Note:</strong> Do not share this OTP with anyone. ServiceHub will never ask for your OTP.
            </div>
            
            <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} ServiceHub. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = {
  ResetPass_OTP_Email_Template,
};
