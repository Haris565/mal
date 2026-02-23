import Router from "express";
import { me } from "../controllers/me.controller";
import { authenticate } from "../middleware";

const router = Router();

router.get("/v1/me", authenticate, me);

export default router;
