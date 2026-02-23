import { Onboarding, Session, User } from "@mal/validators";

export const users = new Map<string, User>();
export const sessions = new Map<string, Session>();
export const onboarding = new Map<string, Onboarding>();
export const passwords = new Map<string, string>();
