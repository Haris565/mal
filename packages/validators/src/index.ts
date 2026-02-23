import z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string(),
});

export const sessionSchema = z.object({
  userId: z.string().uuid(),
  expiresAt: z.date(),
  refreshToken: z.string(),
  accessToken: z.string(),
});

export const profileSchema = z.object({
  fullName: z.string(),
  dateOfBirth: z.date(),
  nationality: z.string(),
});

export const documentSchema = z.object({
  documentType: z.string(),
  documentNumber: z.string(),
});

export const addressSchema = z.object({
  addressLine1: z.string(),
  city: z.string(),
  country: z.string(),
});

export const consentsSchema = z.object({
  termsAccepted: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const onboardingStatusSchema = z.enum([
  "NOT_STARTED",
  "IN_PROGRESS",
  "APPROVED",
  "REJECTED",
  "MANUAL_REVIEW",
]);

export const onboardingSchema = z.object({
  userId: z.string().uuid(),
  profile: profileSchema,
  document: documentSchema,
  address: addressSchema,
  consents: consentsSchema,
  status: onboardingStatusSchema,
});

export type User = z.infer<typeof userSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Document = z.infer<typeof documentSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Consents = z.infer<typeof consentsSchema>;
export type OnboardingStatus = z.infer<typeof onboardingStatusSchema>;
export type Onboarding = z.infer<typeof onboardingSchema>;
