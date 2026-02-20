import { Router } from "express";

import activitiesRouter from "./activitiesRoutes";
import authRouter from "./authRoutes";
import contentRouter from "./contentRoutes";

const router = Router();

router.use("/logs", activitiesRouter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);

export default router;
