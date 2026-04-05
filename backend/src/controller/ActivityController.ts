import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { ActivityLog } from "../database/ActivitiesModel";

export const getAllLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logRepo = AppDataSource.getRepository(ActivityLog);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [logs, total] = await logRepo.findAndCount({
      order: { createdAt: "DESC" },
      skip: offset,
      take: limit,
    });

    res.status(200).json({ page, limit, total, data: logs });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve logs", error: err instanceof Error ? err.message : String(err) });
  }
};
