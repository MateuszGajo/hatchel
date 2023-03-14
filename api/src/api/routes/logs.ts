import { Router } from "express";
import { getLogs } from "../controllers/logsController";
import addLog from "../controllers/logsController/addLog";

const router = Router();

router.get("", getLogs);
router.post("/add", addLog);

export default router;
