// bottom tab bar
import { fonts } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icon =
  (name: keyof typeof Ionicons.glyphMap) =>
  ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={name} size={size} color={color} />
  );

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const appColors = useAppColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.muted,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: {
          backgroundColor: appColors.surface,
          borderTopColor: appColors.border,
          height: 64 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
        },
        sceneStyle: { backgroundColor: appColors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Dashboard", tabBarIcon: icon("grid-outline") }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: "Create", tabBarIcon: icon("add-circle-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: icon("person-outline") }}
      />
    </Tabs>
  );
}
