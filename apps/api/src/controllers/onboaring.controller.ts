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

    const onboardingObj = onboardingSchema.parse({ ...req?.body, userId });

    if (!onboardingObj) {
      return res.status(400).json({ error: "Invalid onboarding data" });
    }

    const { profile, document, address, consents } = onboardingObj;

    const onboardingData: Onboarding = {
      userId,
      profile,
      document,
      address,
      consents,
      status: onboardingStatusSchema.enum.IN_PROGRESS,
    };

    console.log("From submitOnboarding", onboardingData);

    console.log(
      "From submitOnboarding",
      onboardingSchema.safeParse(onboardingData),
    );

    onboarding.set(userId, onboardingData);

    res.json(onboardingData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOnboarding = (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const onboardingData = onboarding.get(userId);

    if (!onboardingData) {
      return res.status(404).json({ error: "Onboarding not found" });
    }

    res.json(onboardingData);
  } catch (error) {}
};
