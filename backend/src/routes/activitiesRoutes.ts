import { Router } from "express";
import { authenticateToken } from "../middleware/JwtParsing";
import { getAllLogs } from "../controller/ActivityController";

const router = Router();

router.get("/", authenticateToken, getAllLogs);

export default router;
