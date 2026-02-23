import { Request, Response } from "express";
import { onboarding } from "../storage";

export const getVerificationStatus = (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const onboardingObj = onboarding.get(userId);

    if (!onboardingObj) {
      return res.status(404).json({ error: "Onboarding not found" });
    }

    res.json(onboardingObj);
  } catch (error) {}
};

export const updateVerificationStatus = (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const onboardingObj = onboarding.get(userId);

    if (!onboardingObj) {
      return res.status(404).json({ error: "Onboarding not found" });
    }

    onboardingObj.status = req?.body?.status;

    onboarding.set(userId, onboardingObj);

    res.json(onboardingObj);
  } catch (error) {}
};
