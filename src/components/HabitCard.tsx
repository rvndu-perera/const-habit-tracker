import AppText from "@/components/ui/AppText";
import { spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import { habitProgress } from "@/utils/progress";
import { Pressable, StyleSheet, View } from "react-native";
import { DayGrid } from "./DayGrid";

type HabitCardProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
  onDelete: () => void;
};

export function HabitCard({ habit, onToggleDay, onDelete }: HabitCardProps) {
  const colors = useAppColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <AppText size={18} weight="bold">
            {habit.name}
          </AppText>
          <AppText size={12} color={colors.muted}>
            {habit.completedDays.length}/{habit.totalDays} days
          </AppText>
        </View>

        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <AppText size={12} color={colors.muted}>
            Remove
          </AppText>
        </Pressable>
      </View>

      <View style={styles.metaRow}>
        <AppText size={12} color={colors.primary} weight="semibold">
          {habitProgress(habit)}% done
        </AppText>
        <AppText size={12} color={colors.muted}>
          {habit.totalDays}-day focus
        </AppText>
      </View>

      <DayGrid habit={habit} onToggleDay={onToggleDay} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleWrap: {
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
});
