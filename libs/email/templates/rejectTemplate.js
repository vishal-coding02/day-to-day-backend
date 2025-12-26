const Rejection_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Application Status</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fef2f2;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid #fecaca;
        }
        .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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
        .rejection-box {
            background: #fef2f2;
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #ef4444;
            margin: 25px 0;
            border: 1px solid #fecaca;
        }
        .status-icon {
            display: inline-block;
            background: #ef4444;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .status-text {
            font-size: 20px;
            font-weight: 600;
            color: #dc2626;
            vertical-align: middle;
        }
        .reason-box {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            border: 1px solid #e2e8f0;
        }
        .reason-title {
            font-weight: 600;
            color: #475569;
            margin-bottom: 10px;
            display: block;
        }
        .reason-content {
            color: #334155;
            font-style: italic;
            line-height: 1.5;
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
        .note {
            font-size: 14px;
            color: #64748b;
            font-style: italic;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px dashed #cbd5e1;
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
            <h1 class="title">Application Status Update</h1>
            <p class="subtitle">Regarding your provider account application</p>
        </div>
        
        <div class="content">
            <p class="greeting">Dear <span class="user-name">{userName}</span>,</p>
            
            <p>Thank you for your interest in becoming a service provider with us.</p>
            
            <div class="rejection-box">
                <span class="status-icon">✗</span>
                <span class="status-text">Application Not Approved</span>
                <p style="margin-top: 15px;">After careful review, we are unable to approve your provider account application at this time.</p>
            </div>
            
            <div class="reason-box">
                <span class="reason-title">Reason for Rejection:</span>
                <div class="reason-content">{reason}</div>
            </div>
            
            <p>We appreciate the time you took to complete the application process.</p>
            
            <p class="note">
                This decision is based on our current evaluation criteria and business requirements.
                You may consider applying again in the future after addressing the mentioned concerns.
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} YourService. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = {Rejection_Email_Template}