import { Users } from "../database/UserModel";


export const excludePassword = (user: Users | null) => {
  if (!user) return null;
  const { password, resetPasswordExpires, resetPasswordToken, ...userWithoutPassword } = user;
  return userWithoutPassword;
};