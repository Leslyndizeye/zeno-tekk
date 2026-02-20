import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Request } from 'express';

// Extend the SessionData interface to include custom properties
declare module 'express-session' {
  interface SessionData {
    otp?: string;
    otpEmail?: string;
    otpExpiry?: number;
    lastname?: string;
    firstname?: string;
    tempPassword?: string;
  }
}


// Load environment variables from .env file
dotenv.config();

// Generate a random OTP (6 alphanumeric characters)
export const generateOtp = (): string => {
  let otp = '';
  otp = Math.floor(100000 + Math.random() * 900000).toString(); // e.g. 6-digit code

  return otp;
};

export const sendOtpEmail = async (email: string, lastName: string, firstName: string, otp: string): Promise<boolean> => {

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.error("GMAIL creds missing");
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ingata E-learning - Your Security Code</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px; border-radius: 8px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 8px;">
        🛡️ Ingata E-learning
      </div>
      <div style="font-size: 14px; color: #666;">
        Secure Learning Access
      </div>
    </div>

    <!-- Main Content -->
    <div style="margin-bottom: 30px;">
      <h1 style="font-size: 20px; color: #333; margin-bottom: 20px;">
        Secure Access Code Required
      </h1>
      
      <p style="color: #666; margin-bottom: 25px;">
        Hi <strong>${firstName}</strong>, use the verification code below to access your account.
      </p>

      <!-- OTP Code -->
      <div style="text-align: center; margin-bottom: 25px;">
        <div style="font-size: 14px; color: #666; margin-bottom: 10px;">Your Verification Code</div>
        <div style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 8px; padding: 15px; background-color: #f9f9f9; border-radius: 6px; display: inline-block;">
          ${otp}
        </div>
        <div style="font-size: 13px; color: #666; margin-top: 10px;">
          Expires in 10 minutes
        </div>
      </div>

      <!-- Security Note -->
      <div style="background-color: #fff8e1; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin-top: 20px;">
        <strong>Security Notice:</strong> If you didn't request this code, you can safely ignore this email.
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
      <div style="margin-bottom: 10px;">
        Need help? <a href="mailto:support@ingatatechnologies.com" style="color: #007bff;">Contact support</a>
      </div>
      <div>
        © ${new Date().getFullYear()} Ingata E-learning. Sent to ${firstName} ${lastName}
      </div>
    </div>
  </div>
</body>
</html>
`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your Login OTP",
    html,
  };

  return new Promise<boolean>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};


export const sendResetPasswordEmail = async (email: string, resetToken: string, frontendBaseUrl: string) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.error("Missing GMAIL creds");
    return;
  }

  const resetUrl = `${frontendBaseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ingata E-learning - Password Reset Request</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px; border-radius: 8px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 8px;">
        🔐 Ingata E-learning
      </div>
      <div style="font-size: 14px; color: #666;">
        Password Reset Request
      </div>
    </div>

    <!-- Main Content -->
    <div style="margin-bottom: 30px;">
      <h1 style="font-size: 20px; color: #333; margin-bottom: 20px;">
        Reset Your Password
      </h1>
      
      <p style="color: #666; margin-bottom: 25px;">
        We received a request to reset your password. Click the button below to create a new password.
      </p>

      <!-- Reset Button -->
      <div style="text-align: center; margin-bottom: 25px;">
        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Reset Password
        </a>
        <div style="font-size: 12px; color: #666; margin-top: 8px;">
          This link expires in 1 hour
        </div>
      </div>

      <!-- Security Note -->
      <div style="background-color: #fff8e1; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
        <strong>Security Tip:</strong> Create a strong password with at least 8 characters including uppercase, lowercase, numbers, and symbols.
      </div>

      <!-- Alternative Section -->
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-top: 20px;">
        <div style="font-size: 14px; color: #666;">
          <strong>Didn't request this?</strong> If you didn't request a password reset, you can safely ignore this email. Your account remains secure.
        </div>
      </div>
    </div>

    <!-- Support Section -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 14px; color: #666; margin-bottom: 10px;">
        Need help? Contact our support team
      </div>
      <a href="mailto:support@ingatatechnologies.com" style="color: #007bff; text-decoration: none; font-weight: bold;">
        support@ingatatechnologies.com
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
      <div>
        © ${new Date().getFullYear()} Ingata E-learning. This email was sent in response to a password reset request.
      </div>
    </div>
  </div>
</body>
</html>
`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Password Reset Instructions',
    html: htmlContent,
  });
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
console.error("Missing GMAIL creds");
return;
}

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.GMAIL_USER,
pass: process.env.GMAIL_PASSWORD,
},
});

const htmlContent = `
  <!DOCTYPE html>

  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful - Ingata E-learning</title>
  </head>
  <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px; border-radius: 8px;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 8px;">
      Ingata E-learning
    </div>
    <div style="font-size: 14px; color: #666;">
      Password Reset Successful
    </div>
  </div>

  <!-- Main Content -->
  <div style="margin-bottom: 30px;">
    <h1 style="font-size: 20px; color: #333; margin-bottom: 20px;">
      Your Password Has Been Reset Successfully
    </h1>

    <p style="color: #666; margin-bottom: 25px;">
      This is a confirmation that your password was successfully reset. You can now sign in with your new password.
    </p>

    <div style="text-align: center; margin-bottom: 25px;">
      <a href="${process.env.FRONTEND_URL}/login" style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
        Go to Login
      </a>
    </div>

    <div style="background-color: #eaf8ea; padding: 15px; border-radius: 6px; border-left: 4px solid #28a745;">
      <strong>Tip:</strong> If this wasn’t you, change your password again immediately or contact support below.
    </div>
  </div>

  <!-- Support Section -->
  <div style="text-align: center; margin-bottom: 20px;">
    <div style="font-size: 14px; color: #666; margin-bottom: 10px;">
      Need help? Contact our support team
    </div>
    <a href="mailto:support@ingatatechnologies.com" style="color: #007bff; text-decoration: none; font-weight: bold;">
      support@ingatatechnologies.com
    </a>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
    <div>
      © ${new Date().getFullYear()} Ingata E-learning. This is a confirmation email for your password reset.
    </div>
  </div>
</div>

  </body>
  </html>
  `;

await transporter.sendMail({
from: process.env.GMAIL_USER,
to: email,
subject: 'Your Password Has Been Reset Successfully',
html: htmlContent,
});
};



// Function to invalidate OTP for a specific email
export const invalidateOtp = (req: Request, email: string): void => {
  if (req.session.otpEmail === email) {
    delete req.session.otp;
    delete req.session.otpEmail;
    delete req.session.otpExpiry;
  }
};
