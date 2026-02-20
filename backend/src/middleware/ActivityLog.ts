import { AppDataSource } from "../config/db";
import { ActivityLog } from "../database/ActivitiesModel";
import { Users } from "../database/UserModel";

export async function logActivity({
  userId,
  action,
  targetId,
  targetType,
  details,
}: {
  userId?: number;
  action: string;
  targetId?: string;
  targetType?: string;
  details?: string;
}) {
  const logRepo = AppDataSource.getRepository(ActivityLog);
  const log = logRepo.create({
    user: userId ? ({ id: userId } as Users) : null,
    action,
    targetId,
    targetType,
    details,
  });
  await logRepo.save(log);
}
