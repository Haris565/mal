import { Request, Response } from "express";
import { onboarding } from "../storage";
import {
  Onboarding,
  onboardingSchema,
  onboardingStatusSchema,
} from "@mal/validators";

export const submitOnboarding = (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const onboardingObj = onboardingSchema.safeParse(req?.body);

    if (!onboardingObj.success) {
      return res.status(400).json({ error: onboardingObj.error.message });
    }

    const { profile, document, address, consents } = onboardingObj.data;

    const onboardingData: Onboarding = {
      userId,
      profile,
      document,
      address,
      consents,
      status: onboardingStatusSchema.enum.IN_PROGRESS,
    };

    onboarding.set(userId, onboardingData);

    res.json(onboardingData);
  } catch (error) {}
};
