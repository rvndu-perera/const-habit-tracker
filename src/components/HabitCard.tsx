import AppText from "@/components/ui/AppText";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import { habitProgress } from "@/utils/progress";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { DayGrid } from "./DayGrid";

type HabitCardProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
  onDelete: () => void;
};

export function HabitCard({ habit, onToggleDay, onDelete }: HabitCardProps) {
  const colors = useAppColors();

  const handleMenuPress = () => {
    Alert.alert(
      habit.name,
      "What would you like to do with this habit?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Habit",
          style: "destructive",
          onPress: onDelete,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <AppText size={20} weight="bold" color={colors.text}>
            {habit.name}
          </AppText>
          <AppText size={13} color={colors.muted} weight="medium" style={styles.subTitle}>
            {habit.completedDays.length}/{habit.totalDays} Days
          </AppText>
        </View>

        <Pressable
          hitSlop={12}
          onPress={handleMenuPress}
          accessibilityRole="button"
          accessibilityLabel={`Options for ${habit.name}`}
          style={({ pressed }) => [styles.menuButton, pressed && styles.menuButtonPressed]}
        >
          <Ionicons name="ellipsis-vertical" size={18} color={colors.muted} />
        </Pressable>
      </View>

      <View style={styles.metaRow}>
        <AppText size={14} weight="semibold" color={colors.text}>
          {habitProgress(habit)}% Done
        </AppText>
        <AppText size={13} weight="medium" color={colors.text}>
          {habit.totalDays} Days Focus
        </AppText>
      </View>

      <DayGrid habit={habit} onToggleDay={onToggleDay} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleWrap: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  subTitle: {
    marginTop: 4,
  },
  menuButton: {
    padding: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  menuButtonPressed: {
    opacity: 0.6,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 14,
  },
});
