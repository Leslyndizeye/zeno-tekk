import { AppDataSource } from "../config/db";
import { ActivityLog } from "../database/ActivitiesModel";
import { Users } from "../database/UserModel";

export async function logActivity({
  userId,
  email,
  action,
  targetId,
  targetType,
  details,
}: {
  userId?: number;
  email?: string;
  action: string;
  targetId?: string;
  targetType?: string;
  details?: string;
}) {
  try {
    const logRepo = AppDataSource.getRepository(ActivityLog);
    const log = logRepo.create({
      user: userId ? ({ id: userId } as Users) : null,
      email: email || undefined,
      action,
      targetId,
      targetType,
      details,
    });
    await logRepo.save(log);
  } catch (err) {
    // Never let logging failures break the main flow
    console.error("Activity log error:", err);
  }
}
