import Router from "express";
import {
  getVerificationStatus,
  updateVerificationStatus,
} from "../controllers/verification.controller";
import { authenticate } from "../middleware";

const router = Router();

router.get("/v1/verification/status", authenticate, getVerificationStatus);

router.post("/v1/verification/update", authenticate, updateVerificationStatus);

export default router;
