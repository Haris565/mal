import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sessions, users } from "./storage";
import { User } from "@mal/validators";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access_token_secret";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  let payload: { userId: string };

  try {
    payload = jwt.verify(token, accessTokenSecret) as { userId: string };
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = sessions.get(payload.userId);

  if (!session || session.accessToken !== token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (new Date() > new Date(session.expiresAt)) {
    return res.status(401).json({ error: "Session expired" });
  }

  const user = users.get(payload.userId);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = user;

  next();
};
