import { fonts } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 64;
const TAB_BAR_PADDING_TOP = 8;

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

function AppTabBar({ state, navigation }: TabBarProps) {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: TAB_BAR_HEIGHT + TAB_BAR_PADDING_TOP + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route: Route, index: number) => {
        const isFocused = state.index === index;
        const tab = TABS.find((t) => t.name === route.name) ?? TABS[0];
        const iconColor = isFocused ? colors.primary : colors.muted;

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
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={tab.title}
          >
            <Ionicons name={tab.icon} size={23} color={iconColor} />
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
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const appColors = useAppColors();

  const sceneBottomPadding =
    TAB_BAR_HEIGHT + TAB_BAR_PADDING_TOP + insets.bottom + 12;

  return (
    <Tabs
      tabBar={(props) => (
        <AppTabBar
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

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    paddingTop: TAB_BAR_PADDING_TOP,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  tabItemPressed: {
    opacity: 0.65,
  },
  label: {
    fontSize: 11,
  },
});
