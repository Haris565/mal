import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Session, Onboarding } from "@mal/validators";
import { darkTheme, lightTheme, ThemeColors } from "./constants/theme";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

type SessionStore = {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

type OnboardingStore = {
  onboarding: Onboarding | null;
  setOnboarding: (onboarding: Onboarding) => void;
  clearOnboarding: () => void;
};

type ThemeStore = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  colors: ThemeColors;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "session",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      onboarding: null,
      setOnboarding: (onboarding) => set({ onboarding }),
      clearOnboarding: () => set({ onboarding: null }),
    }),
    {
      name: "onboarding",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) =>
        set({
          theme,
          colors: theme === "light" ? lightTheme.colors : darkTheme.colors,
        }),
      colors: lightTheme.colors,
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
