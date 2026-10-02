import AppText from "@/components/ui/AppText";
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
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <AppText size={22} weight="bold" style={styles.title}>
        {title}
      </AppText>
      <AppText color={colors.muted} style={styles.message}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
  },
  message: {
    textAlign: "center",
  },
});
