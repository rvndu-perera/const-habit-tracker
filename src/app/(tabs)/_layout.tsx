// Floating pill tab bar
import { fonts } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Constants ────────────────────────────────────────────────────────────────
const TAB_BAR_HEIGHT = 66;
const TAB_BAR_MARGIN_H = 24;
const TAB_BAR_BOTTOM_GAP = 14;

const TABS: {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: "index",
    title: "Dashboard",
    icon: "grid-outline",
  },
  {
    name: "create",
    title: "Create",
    icon: "add-circle-outline",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-circle-outline",
  },
];

// Minimal local types — avoids requiring @react-navigation/bottom-tabs at top-level
type Route = { key: string; name: string };
type TabNavigation = {
  emit: (event: {
    type: string;
    target: string;
    canPreventDefault: boolean;
  }) => { defaultPrevented: boolean };
  navigate: (name: string) => void;
};
type TabBarProps = {
  state: { routes: Route[]; index: number };
  navigation: TabNavigation;
};

// ─── Custom floating tab bar ──────────────────────────────────────────────────
function FloatingTabBar({ state, navigation }: TabBarProps) {
  const colors = useAppColors();
  const isDark = useHabitStore((s) => s.themeMode) === "dark";
  const insets = useSafeAreaInsets();

  const bottomOffset = Math.max(insets.bottom, 0) + TAB_BAR_BOTTOM_GAP;

  return (
    <View style={[styles.wrapper, { bottom: bottomOffset }]}>
      {/* Shadow layer (no overflow:hidden so shadow spreads freely) */}
      <View
        style={[
          styles.shadow,
          {
            backgroundColor: colors.surface,
            shadowOpacity: isDark ? 0 : 0.1,
            borderWidth: isDark ? 1 : 0,
            borderColor: isDark ? colors.border : "transparent",
          },
        ]}
      >
        {/* Clip layer — rounds press ripple/backgrounds to pill boundary */}
        <View style={[styles.bar, { backgroundColor: colors.surface }]}>
          {state.routes.map((route: Route, index: number) => {
            const isFocused = state.index === index;
            const tab = TABS.find((t) => t.name === route.name) ?? TABS[0];

            // Active: primary color. Inactive: muted. Icon stays outline always.
            const iconColor = isFocused ? colors.primary : colors.muted;
            const iconName = tab.icon;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={({ pressed }) => [
                  styles.tabItem,
                  pressed && styles.tabItemPressed,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={tab.title}
              >
                {/*
                 * Icon: use `key` so React unmounts/remounts Ionicons
                 * whenever the name changes — guarantees the filled
                 * variant renders even if the icon size/color are unchanged.
                 */}
                <Ionicons
                  name={iconName}
                  size={24}
                  color={iconColor}
                />
                <Text
                  style={[
                    styles.label,
                    {
                      color: iconColor,
                      fontFamily: isFocused ? fonts.semibold : fonts.medium,
                    },
                  ]}
                >
                  {tab.title}
                </Text>

                {/* Active dot — small pill beneath the label */}
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: isFocused
                        ? colors.primary
                        : "transparent",
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const appColors = useAppColors();

  const sceneBottomPadding =
    TAB_BAR_HEIGHT + Math.max(insets.bottom, 0) + TAB_BAR_BOTTOM_GAP + 12;

  return (
    <Tabs
      tabBar={(props) => (
        <FloatingTabBar
          state={props.state}
          navigation={props.navigation as unknown as TabNavigation}
        />
      )}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: appColors.bg,
          paddingBottom: sceneBottomPadding,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: TAB_BAR_MARGIN_H,
    right: TAB_BAR_MARGIN_H,
  },
  // Shadow host — must NOT have overflow:hidden so shadow spreads out
  shadow: {
    borderRadius: 40,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    elevation: 12,
  },
  // Clip host — overflow:hidden keeps content/ripple within the pill
  bar: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    borderRadius: 40,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    gap: 2,
  },
  tabItemPressed: {
    opacity: 0.5,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.1,
  },
  // Small pill dot — visible only on the active tab
  dot: {
    width: 18,
    height: 3,
    borderRadius: 2,
    marginTop: 3,
  },
});
