import Router from "express";
import { login, register, refresh, logout } from "../controllers/auth.controller";
import { authenticate } from "../middleware";

const router = Router();

router.post("/v1/auth/login", login);
router.post("/v1/auth/register", register);
router.post("/v1/auth/refresh", refresh);
router.post("/v1/auth/logout", authenticate, logout);

export default router;
