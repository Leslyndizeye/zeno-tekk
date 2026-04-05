import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../database/UserModel";
import { AppDataSource } from "../config/db";
import bcrypt, { compare, hash } from "bcryptjs";
import { generateOtp, sendPasswordResetSuccessEmail } from "../services/SessionOtp";
import { sendOtpEmail } from "../services/SessionOtp";
import { Otp } from "../database/OtpModel";
import { MoreThan } from "typeorm";
import { sendResetPasswordEmail } from "../services/SessionOtp";
import { logActivity } from "../middleware/ActivityLog";
import crypto from 'crypto';
import { uploadToCloudinary } from "../services/cloudinary";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
const COOKIE_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

interface CustomRequest extends Request {
  user?: { id: number; email?: string };
}


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const userRepository = AppDataSource.getRepository(Users);
    const otpRepository = AppDataSource.getRepository(Otp);

    const user = await userRepository.findOne({
      where: { email }});


    if (!user) {
      res.status(400).json({ message: "Invalid email." });
      return;
    }

    if (user.disabled) {
      res.status(403).json({ message: "User account is disabled. Contact admin." });
      return;
    }

    // Check password
    if (!user.password) {
      res.status(400).json({ message: "Password not set for this user." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password.",isPasswordValid });
      return;
    }


    if (user.twostepv === true) {
      const otp = generateOtp(); 
      const expiry = new Date(Date.now() + 10 * 60 * 1000);
        
      // Save OTP to DB
      const otpRecord = otpRepository.create({
        userId: user.id,
        otpCode: otp,
        expiresAt: expiry,
      });

      await otpRepository.save(otpRecord);
    
      await sendOtpEmail(user.email, user.lastName, user.firstName, otp);
      
      res.status(200).json({
        message: "OTP sent. Please verify to complete login."
      });
    }
    else {
      // Create token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicUrl,
          twostepv: user.twostepv,
        },
        SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: COOKIE_EXPIRATION,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({
        message: "OTP verified. Login successful.",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicUrl,
          twostepv: user.twostepv,
        }
      });
    }
    
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required." });
      return;
    }

    const userRepository = AppDataSource.getRepository(Users);
    const otpRepository = AppDataSource.getRepository(Otp);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const newOtp = otpRepository.create({
      userId: user.id,
      otpCode,
      expiresAt,
    });

    await otpRepository.save(newOtp);
    await sendOtpEmail(user.email, user.lastName, user.firstName, otpCode);

    res.status(200).json({ message: "OTP resent. Check your email." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { otp, email } = req.body; 

    if (!otp || !email) {
      res.status(400).json({ message: "OTP and email are required" });
      return;
    }

    const otpRepository = AppDataSource.getRepository(Otp);
    const userRepository = AppDataSource.getRepository(Users);

    // Find OTP record by user email and OTP code, still valid
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const otpRecord = await otpRepository.findOne({
      where: {
        userId: user.id,
        otpCode: otp,
        expiresAt: MoreThan(new Date()),
        used: false,
      },
    });

    if (!otpRecord) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    // Mark OTP as used in DB
    otpRecord.used = true;
    await otpRepository.save(otpRecord);

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicUrl,
        twostepv: user.twostepv,
      },
      SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRATION,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "OTP verified. Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicUrl,
        twostepv: user.twostepv,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({ message: "Logout successful." });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error during logout" });
    }
  }



export class UserClassController {

static async addUser(req: Request, res: Response): Promise<void> {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    if (!firstName || !lastName || !email) {
      res.status(400).json({ message: "firstName, lastName and email are required." });
      return;
    }

    const userRepository = AppDataSource.getRepository(Users);

    // Check for duplicate user
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: `Users with email ${email} already exists.` });
      return;
    }

    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await userRepository.save(newUser);

    // Log activity
    const actor = (req as CustomRequest).user;
    if (actor) {
      await logActivity({
        userId: actor.id,
        email: actor.email,
        action: "Created user",
        targetId: newUser.id.toString(),
        targetType: "Users",
        details: `Created user ${firstName} ${lastName} (${email})`,
      });
    }

    res.status(201).json({
      message: "Users created successfully.",
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding user.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}


static async getUsers(req: CustomRequest, res: Response): Promise<void> {
  try {
    const userRepository = AppDataSource.getRepository(Users);

    const users = await userRepository.find({
    });
    const userDtos = users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    }));

    res.status(200).json({
      message: "Users fetched successfully",
      users: userDtos,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}


static async getUserById(req: Request, res: Response): Promise<void> {
  try {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicUrl: user.profilePicUrl || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}


  static async updateUser(req: CustomRequest, res: Response): Promise<void> {
    try {
        const userRepository = AppDataSource.getRepository(Users);

        const userId = Number(req.params.id);
        const { firstName, lastName, email } = req.body;

        // Find existing user
        const user = await userRepository.findOne({
            where: { id: userId } });

        if (!user) {
            res.status(404).json({ message: "Users not found" });
            return;
        }

        // Update other fields
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (email !== undefined) user.email = email;

        // Save updated user
        await userRepository.save(user);

        // Log it
        const actor = (req as CustomRequest).user;
        if (actor) {
        await logActivity({
            userId: actor.id,
            email: actor.email,
            action: "Updated user",
            targetId: user.id.toString(),
            targetType: "Users",
            details: `Updated user ${user.firstName} ${user.lastName} (${user.email})`,
        });
        }

        res.status(200).json({
            message: "Users updated successfully",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error updating user", 
            error: error instanceof Error ? error.message : String(error)
        });
    }
  }

  static async toggleUserDisabled(req: CustomRequest, res: Response): Promise<void> {
  try {
    const userRepository = AppDataSource.getRepository(Users);
    const userId = Number(req.params.id);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Flip the disabled status
    user.disabled = !user.disabled;

    await userRepository.save(user);

    // Log action
    const actor = (req as CustomRequest).user;
    if (actor) {
      await logActivity({
        userId: actor.id,
        email: actor.email,
        action: user.disabled ? "Disabled user" : "Enabled user",
        targetId: user.id.toString(),
        targetType: "Users",
        details: `${user.disabled ? "Disabled" : "Enabled"} user ${user.firstName} ${user.lastName} (${user.email})`,
      });
    }

    res.status(200).json({
      message: `User ${user.disabled ? "disabled" : "enabled"} successfully`,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        disabled: user.disabled,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error toggling user disabled status",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}


 static async deleteUser(req: CustomRequest, res: Response): Promise<void> {
  try {
    const userRepository = AppDataSource.getRepository(Users);
    const userId = Number(req.params.id);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "Users not found" });
      return;
    }


    // Log activity
    const actor = (req as CustomRequest).user;
    if (actor) {
      await logActivity({
        userId: actor.id,
        email: actor.email,
        action: "Deleted user",
        targetId: user.id.toString(),
        targetType: "Users",
        details: `Deleted user ${user.firstName} ${user.lastName} (${user.email})`,
      });
    }

    await userRepository.remove(user);

    res.status(200).json({
      message: "Users deleted successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}


    static async changePassword(req: Request, res: Response): Promise<void> {
      const userId = Number(req.params.id);
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword || newPassword.length < 6) {
        res.status(400).json({ message: "Old and new passwords are required. New must be at least 6 chars." });
        return;
      }

      try {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOneBy({ id: userId });

        if (!user) {
          res.status(404).json({ message: "Users not found." });
          return;
        }

        const isMatch = await compare(oldPassword, user.password!);
        if (!isMatch) {
          res.status(401).json({ message: "Old password is incorrect." });
          return;
        }

        user.password = await hash(newPassword, 10);
        await userRepo.save(user);

        await logActivity({
            userId,
            action: 'Changed password',
            targetId: userId.toString(),
            targetType: 'Users',
            details: `Users changed their password.`,
        });

        res.status(200).json({ message: "Password changed successfully." });
      } catch (err) {
        res.status(500).json({ message: "Error updating password", error: err instanceof Error ? err.message : String(err) });
      }
    }

    static async toggleTwoStepv(req: Request, res: Response): Promise<void> {
      const userId = Number(req.params.id);
      const { twostepv } = req.body;

      if (typeof twostepv !== "boolean") {
        res.status(400).json({ message: "'Two Step Verification' must be a boolean." });
        return;
      }

      try {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOneBy({ id: userId });

        if (!user) {
          res.status(404).json({ message: "User not found." });
          return;
        }

        user.twostepv = twostepv;
        await userRepo.save(user);

        await logActivity({
          userId,
          action: 'Toggled Two Step Verification',
          targetId: userId.toString(),
          targetType: 'Users',
          details: `Set 2Step Verification to ${twostepv}`,
        });

        res.status(200).json({ message: `2Step Verification set to ${twostepv}` });
      } catch (err) {
        res.status(500).json({ message: "Error updating 2Step Verification", error: err instanceof Error ? err.message : String(err) });
      }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
      const { email, frontendBaseUrl } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email is required." });
        return;
      }

      try {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOneBy({ email });

        if (!user) {
          // Don't reveal if email exists, just say "if email found"
          res.status(200).json({ message: "A reset link has been sent." });
          return;
        }

        // Generate token & expiry (e.g. 1 hour)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetExpires = Date.now() + 3600 * 1000; // hour from now

        // Save hashed token and expiry to user (add these columns to Users model)
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = new Date(resetExpires);
        await userRepo.save(user);

        // Send email with link
        await sendResetPasswordEmail(email, resetToken, frontendBaseUrl);

        res.status(200).json({ message: "If that email is registered, a reset link has been sent." });
      } catch (err) {
        res.status(500).json({ message: "Error processing forgot password", error: err instanceof Error ? err.message : String(err) });
      }
    }


    static async resetPassword(req: Request, res: Response): Promise<void> {
      const { email, token, newPassword } = req.body;

      if (!email || !token || !newPassword || newPassword.length < 6) {
        res.status(400).json({ message: "Email, token, and new password (6+ chars) are required." });
        return;
      }

      try {
        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOneBy({ email });

        if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
          res.status(400).json({ message: "Invalid or expired token." });
          return;
        }

        // Hash incoming token & compare
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        if (tokenHash !== user.resetPasswordToken || user.resetPasswordExpires < new Date()) {
          res.status(400).json({ message: "Invalid or expired token." });
          return;
        }

        // update password
        user.password = await hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await userRepo.save(user);

        await logActivity({
          userId: user.id,
          action: 'Reset password',
          targetId: user.id.toString(),
          targetType: 'Users',
          details: 'Users reset their password using reset token.',
        });

        await sendPasswordResetSuccessEmail(user.email);

        res.status(200).json({ message: "Password reset successfully." });
      } catch (err) {
        res.status(500).json({ message: "Error resetting password", error: err instanceof Error ? err.message : String(err) });
      }
    }


    static async uploadProfilePic(req: CustomRequest, res: Response): Promise<void> {
      const userId = Number(req.params.id);
      const file = req.file;

      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      try {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedMimeTypes.includes(file.mimetype)) {
          res.status(400).json({ message: "Only image files are allowed (jpg, png, webp)" });
          return;
        }
        const result = await uploadToCloudinary(file.path);

        const userRepo = AppDataSource.getRepository(Users);
        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user) {
          res.status(404).json({ message: "Users not found" });
          return;
        }

        user.profilePicUrl = result.secure_url;
        await userRepo.save(user);

        res.status(200).json({ message: "Profile picture updated", profilePicUrl: user.profilePicUrl });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }


}
