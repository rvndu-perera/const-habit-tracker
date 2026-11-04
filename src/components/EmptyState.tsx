import AppText from "@/components/ui/AppText";
import { spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { Image, StyleSheet, View } from "react-native";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  const colors = useAppColors();
  const isDark = useHabitStore((state) => state.themeMode === "dark");

  return (
    <View style={styles.container}>
      <Image
        source={require("@/../assets/images/empty-img.png")}
        style={[styles.illustration, { opacity: isDark ? 0.62 : 1 }]}
        resizeMode="contain"
        accessible
        accessibilityLabel="An empty folder illustration"
      />
      <AppText size={20} weight="bold" color={colors.text} style={styles.title}>
        {title}
      </AppText>
      <AppText size={14} color={colors.muted} style={styles.message}>
        {message}
      </AppText>
    </View>
  );
}

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 210,
    height: 184,
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    lineHeight: 20,
  },
});
