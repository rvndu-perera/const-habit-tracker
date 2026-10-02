export type ThemeMode = "light" | "dark";

export const lightColors = {
  bg: "#FAFAF9",
  surface: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  primary: "#4F46E5",
  primarySoft: "#EEF2FF",
  success: "#10B981",
};

export const darkColors = {
  bg: "#111410",
  surface: "#1C211B",
  text: "#EDF2E9",
  muted: "#A0AA9A",
  border: "#333C31",
  primary: "#80B89A",
  primarySoft: "#253B30",
  success: "#83C99D",
};

export const colors = lightColors;
export const getColors = (mode: ThemeMode) =>
  mode === "dark" ? darkColors : lightColors;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const radius = { sm: 8, md: 14, lg: 20 };

export const fonts = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
};
