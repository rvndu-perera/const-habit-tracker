export type ThemeMode = "light" | "dark";

export const lightColors = {
  bg: "#F4F4F6",
  surface: "#FFFFFF",
  surfaceSecondary: "#ECECEE",
  text: "#18181B",
  muted: "#71717A",
  border: "#E4E4E7",
  primary: "#18181B",
  primarySoft: "#E4E4E7",
  success: "#10B981",
  blockActive: "#18181B",
  blockInactive: "#E4E4E7",
  badgeBg: "#18181B",
  badgeTrack: "#E4E4E7",
  badgeIndicator: "#18181B",
  badgeText: "#FFFFFF",
};

export const darkColors = {
  bg: "#09090B",
  surface: "#18181B",
  surfaceSecondary: "#27272A",
  text: "#F4F4F5",
  muted: "#A1A1AA",
  border: "#27272A",
  primary: "#F4F4F5",
  primarySoft: "#27272A",
  success: "#10B981",
  blockActive: "#F4F4F5",
  blockInactive: "#27272A",
  badgeBg: "#27272A",
  badgeTrack: "#3F3F46",
  badgeIndicator: "#FFFFFF",
  badgeText: "#FFFFFF",
};

export type AppColors = typeof lightColors;

export const colors = lightColors;
export const getColors = (mode: ThemeMode): AppColors =>
  mode === "dark" ? darkColors : lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius = {
  xs: 4,
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const fonts = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
};
