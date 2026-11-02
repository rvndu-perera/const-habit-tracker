import AppText from "@/components/ui/AppText";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { StyleSheet, View } from "react-native";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  const colors = useAppColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
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
    padding: spacing.xl,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 8,
  },
  message: {
    textAlign: "center",
    lineHeight: 20,
  },
});
