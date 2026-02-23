export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  background: string;
  foreground: string;

  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  muted: string;
  mutedForeground: string;

  accent: string;
  accentForeground: string;

  destructive: string;

  border: string;
  input: string;
  ring: string;

  textPrimary: string;
  textSecondary: string;
  inputBg: string;
  inputBorder: string;
  placeholder: string;
  error: string;
  link: string;

  buttonDisabled: string;
  buttonText: string;

  tintColor: string;
};

export type AppTheme = {
  mode: ThemeMode;
  radius: number;
  colors: ThemeColors;
};

export const lightTheme: AppTheme = {
  mode: "light",
  radius: 10, // 0.625rem ~ 10px
  colors: {
    background: "#FFFFFF",
    foreground: "#0A0A0A",

    primary: "#171717",
    primaryForeground: "#FAFAFA",

    secondary: "#F5F5F5",
    secondaryForeground: "#171717",

    muted: "#F5F5F5",
    mutedForeground: "#737373",

    accent: "#F5F5F5",
    accentForeground: "#171717",

    destructive: "#E7000B",

    border: "#E5E5E5",
    input: "#E5E5E5",
    ring: "#A1A1A1",

    textPrimary: "#0A0A0A",
    textSecondary: "#737373",

    inputBg: "#FFFFFF",
    inputBorder: "#E5E5E5",
    placeholder: "#737373",
    error: "#E7000B",
    link: "#171717",

    buttonDisabled: "#A1A1A1",
    buttonText: "#FAFAFA",

    tintColor: "#2f95dc",
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  radius: 10,
  colors: {
    background: "#0A0A0A",
    foreground: "#FAFAFA",

    primary: "#E5E5E5",
    primaryForeground: "#171717",

    secondary: "#2A2A2A",
    secondaryForeground: "#FAFAFA",

    muted: "#2A2A2A",
    mutedForeground: "#A1A1A1",

    accent: "#2A2A2A",
    accentForeground: "#FAFAFA",

    destructive: "#FF4545",

    border: "#FFFFFF1A", // 10% alpha
    input: "#FFFFFF26", // 15% alpha
    ring: "#737373",

    textPrimary: "#FAFAFA",
    textSecondary: "#A1A1A1",
    inputBg: "#171717",
    inputBorder: "#FFFFFF1A",
    placeholder: "#A1A1A1",
    error: "#FF4545",
    link: "#E5E5E5",

    buttonDisabled: "#737373",
    buttonText: "#171717",
    tintColor: "#fff",
  },
};
