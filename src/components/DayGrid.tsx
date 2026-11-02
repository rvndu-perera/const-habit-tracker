import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import { Pressable, StyleSheet, View } from "react-native";

type DayGridProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
};

const BLOCK_SIZE = 26;
const GAP = 8;

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
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel={`Day ${day}, ${isDone ? "completed" : "incomplete"}`}
            onPress={() => onToggleDay(day)}
            style={({ pressed }) => [
              styles.block,
              {
                backgroundColor: isDone
                  ? colors.blockActive
                  : colors.blockInactive,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

export default DayGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    alignItems: "center",
  },
  block: {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    borderRadius: 4,
  },
});
