import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const userName = useHabitStore((s) => s.userName);
  const themeMode = useHabitStore((s) => s.themeMode);
  const appColors = useAppColors();
  const hydrated = useHabitStore((s) => s.hydrated);
  const segments = useSegments();
  const router = useRouter();
  const ready = fontsLoaded && hydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const current = segments[0];
    const inOnboarding = current === "onboarding";
    const inTabs = current === "(tabs)";

    if (!userName && !inOnboarding) {
      router.replace("/onboarding");
      return;
    }

    if (userName && !inTabs) {
      router.replace("/(tabs)");
    }
  }, [ready, userName, segments, router]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: appColors.bg },
        }}
      />
    </>
  );
}
