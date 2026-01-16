const OTP_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - OTP Code</title>
    <style>
        /* Your Website Theme Colors */
        :root {
            --primary-50: #eff6ff;
            --primary-100: #dbeafe;
            --primary-200: #bfdbfe;
            --primary-300: #93c5fd;
            --primary-400: #60a5fa;
            --primary-500: #3b82f6;
            --primary-600: #2563eb;
            --primary-700: #1d4ed8;
            --primary-800: #1e40af;
            --primary-900: #1e3a8a;
            
            --neutral-50: #f8fafc;
            --neutral-100: #f1f5f9;
            --neutral-200: #e2e8f0;
            --neutral-300: #cbd5e1;
            --neutral-400: #94a3b8;
            --neutral-500: #64748b;
            --neutral-600: #475569;
            --neutral-700: #334155;
            --neutral-800: #1e293b;
            --neutral-900: #0f172a;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--neutral-50);
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid var(--neutral-200);
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.1;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
            letter-spacing: 1px;
            color: white;
        }
        
        .title {
            font-size: 28px;
            font-weight: 700;
            margin: 15px 0;
        }
        
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 30px;
            color: var(--neutral-700);
            line-height: 1.7;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 25px;
            color: var(--neutral-800);
        }
        
        .user-name {
            color: var(--primary-600);
            font-weight: 600;
        }
        
        .otp-container {
            background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border: 2px solid var(--primary-200);
        }
        
        .otp-label {
            display: block;
            color: var(--neutral-600);
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .otp-code {
            font-size: 42px;
            font-weight: 800;
            letter-spacing: 8px;
            color: var(--primary-600);
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
            display: inline-block;
            min-width: 280px;
            border: 2px dashed var(--primary-300);
            font-family: 'Courier New', monospace;
        }
        
        .otp-expiry {
            color: var(--neutral-500);
            font-size: 14px;
            margin-top: 15px;
            font-weight: 500;
        }
        
        .expiry-time {
            color: var(--primary-600);
            font-weight: 700;
        }
        
        .info-box {
            background: var(--neutral-50);
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid var(--primary-400);
        }
        
        .security-note {
            background: #fff7ed;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
            border: 1px solid #fed7aa;
            color: #9a3412;
            font-size: 14px;
        }
        
        .warning-icon {
            color: #ea580c;
            margin-right: 8px;
            font-weight: bold;
        }
        
        .steps {
            margin: 25px 0;
            padding-left: 20px;
        }
        
        .steps li {
            margin-bottom: 12px;
            color: var(--neutral-600);
        }
        
        .footer {
            background: linear-gradient(135deg, var(--neutral-800) 0%, var(--neutral-900) 100%);
            color: var(--neutral-300);
            padding: 30px;
            text-align: center;
            font-size: 14px;
            border-top: 1px solid var(--neutral-700);
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 15px;
            background: linear-gradient(135deg, var(--primary-400) 0%, var(--primary-500) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .support-info {
            margin: 20px 0;
            font-size: 13px;
            color: var(--neutral-400);
        }
        
        p {
            margin: 0 0 20px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            .content {
                padding: 25px 20px;
            }
            .otp-code {
                font-size: 36px;
                letter-spacing: 6px;
                min-width: 240px;
                padding: 15px;
            }
            .header {
                padding: 30px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">YourService</div>
            <h1 class="title">Email Verification</h1>
            <p class="subtitle">Complete your registration with OTP</p>
        </div>
        
        <div class="content">
            <p class="greeting">Hello <span class="user-name">{userName}</span>,</p>
            
            <p>Welcome to YourService! To complete your registration and verify your email address, please use the One-Time Password (OTP) below:</p>
            
            <div class="otp-container">
                <span class="otp-label">Your verification code is:</span>
                <div class="otp-code">{verificationCode}</div>
                <div class="otp-expiry">
                    This code will expire in <span class="expiry-time">{expiryTime} minutes</span>
                </div>
            </div>
            
            <div class="info-box">
                <p><strong>How to use this OTP:</strong></p>
                <ol class="steps">
                    <li>Copy the 6-digit code above</li>
                    <li>Go back to the verification page</li>
                    <li>Paste or enter the code in the OTP field</li>
                    <li>Click "Verify" to complete your registration</li>
                </ol>
            </div>
            
            <div class="security-note">
                <p><span class="warning-icon">⚠</span> <strong>Security Note:</strong></p>
                <p>Never share this OTP with anyone. YourService team will never ask for your OTP, password, or other sensitive information via email.</p>
                <p>If you didn't request this code, please ignore this email or contact our support team immediately.</p>
            </div>
            
            <p>Having trouble? Try these solutions:</p>
            <ul class="steps">
                <li>Make sure you're entering the code exactly as shown</li>
                <li>The code is case-sensitive</li>
                <li>Check if the code has expired and request a new one if needed</li>
            </ul>
        </div>
        
        <div class="footer">
            <div class="footer-logo">YourService</div>
            <p>Connecting skilled professionals with customers who need their services</p>
            
            <div class="support-info">
                <p>Need help? Contact our support team at <a href="mailto:support@yourservice.com" style="color: #60a5fa; text-decoration: none;">support@yourservice.com</a></p>
            </div>
            
            <p>© ${new Date().getFullYear()} YourService. All rights reserved.</p>
            <p>This is an automated email, please do not reply to this message.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { OTP_Email_Template}