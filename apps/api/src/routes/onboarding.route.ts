import Router from "express";
import {
  getOnboarding,
  submitOnboarding,
} from "../controllers/onboaring.controller";
import { authenticate } from "../middleware";

const router = Router();

router.post("/v1/onboarding/submit", authenticate, submitOnboarding);
router.get("/v1/onboarding", authenticate, getOnboarding);

export default router;
