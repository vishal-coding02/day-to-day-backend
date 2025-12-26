const Approval_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Approved</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
        }
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .title {
            font-size: 24px;
            font-weight: 600;
            margin: 10px 0;
        }
        .subtitle {
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
            color: #334155;
            line-height: 1.6;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #1e293b;
        }
        .user-name {
            color: #1e40af;
            font-weight: 600;
        }
        .message {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            margin: 20px 0;
        }
        .cta-button {
            display: block;
            width: 100%;
            max-width: 300px;
            margin: 30px auto;
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            color: white;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }
        .footer {
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
            border-top: 1px solid #e2e8f0;
        }
        p {
            margin: 0 0 15px;
        }
        .login-link {
            word-break: break-all;
            color: #3b82f6;
            font-size: 13px;
            margin-top: 10px;
            display: block;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">YourService</div>
            <h1 class="title">Account Approved</h1>
            <p class="subtitle">You're ready to get started</p>
        </div>
        
        <div class="content">
            <p class="greeting">Hello <span class="user-name">{userName}</span>,</p>
            
            <div class="message">
                <p>Great news! Your provider account has been reviewed and <strong>approved</strong>.</p>
                <p>You can now login and start accepting service requests immediately.</p>
            </div>
            
            <a href="{loginLink}" class="cta-button">Login Now</a>
            
            <p style="text-align: center; font-size: 13px; color: #64748b;">
                Or copy and paste this link in your browser:<br>
                <span class="login-link">{loginLink}</span>
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} YourService. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { Approval_Email_Template };
