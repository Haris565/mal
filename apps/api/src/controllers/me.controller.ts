import { Request, Response } from "express";
import { users } from "../storage";

export const me = (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = users.get(userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json(user);
  } catch (error) {}
};
