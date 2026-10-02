import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./ui/AppText";

type DayGridProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
};

export function DayGrid({ habit, onToggleDay }: DayGridProps) {
  const colors = useAppColors();
  const days = Array.from({ length: habit.totalDays }, (_, index) => index + 1);

  return (
    <View style={styles.grid}>
      {days.map((day) => {
        const isDone = habit.completedDays.includes(day);

        return (
          <Pressable
            key={day}
            onPress={() => onToggleDay(day)}
            style={[
              styles.day,
              isDone
                ? {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  }
                : {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
              day % 5 === 0 ? styles.dayLastInRow : null,
            ]}
          >
            <AppText
              size={11}
              weight="medium"
              color={isDone ? "#fff" : colors.muted}
            >
              {day}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  day: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  dayLastInRow: {
    marginRight: 0,
  },
});
