import { loginSchema, registerSchema, Session, User } from "@mal/validators";
import { comparePassword, hashPassword } from "../helpers";
import { generateAccessToken } from "../helpers";
import { generateRefreshToken } from "../helpers";
import { Request, Response } from "express";
import { users, sessions, passwords } from "../storage";
import uuid from "uuid";

export const login = (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req?.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }

    const { email, password } = result.data;

    const user = users.get(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const storedPassword = passwords.get(user.id);

    if (!storedPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = comparePassword(password, storedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const session = sessions.get(user.id);

    if (!session) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(session.userId);
    const refreshToken = generateRefreshToken(session.userId);

    session.accessToken = accessToken;
    session.refreshToken = refreshToken;

    sessions.set(session.userId, session);

    res.json({ user, session });
  } catch (error) {}
};

export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req?.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }

    const { name, email, password } = result.data;

    const storedUsers = users.entries();

    for (const [key, value] of storedUsers) {
      if (value.email === email) {
        return res.status(409).json({ error: "User already exists" });
      }
    }
    const id = uuid.v4();

    const userObj: User = {
      id,
      fullName: name,
      email,
    };

    users.set(id, userObj);

    const passwordHash = await hashPassword(password);

    passwords.set(email, passwordHash);

    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);

    const sessionObj: Session = {
      userId: id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      accessToken,
      refreshToken,
    };

    sessions.set(id, sessionObj);

    res.json({ user: userObj, session: sessionObj });
  } catch (error) {}
};

export const refresh = (req: Request, res: Response) => {
  try {
    const resfrshToke = req?.body.refreshToken;

    if (!resfrshToke) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    const storedSessions = sessions.entries();

    let session;

    for (const [key, value] of storedSessions) {
      if (value.refreshToken === resfrshToke) {
        session = value;
        break;
      }
    }

    if (!session) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users.get(session.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(session.userId);
    const refreshToken = generateRefreshToken(session.userId);

    session.accessToken = accessToken;
    session.refreshToken = refreshToken;

    sessions.set(session.userId, session);

    res.json({ user, session });
  } catch (error) {}
};
