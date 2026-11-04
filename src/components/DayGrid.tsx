import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

type DayGridProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
};

const BLOCK_SIZE = 26;
const GAP = 8;

export function DayGrid({ habit, onToggleDay }: DayGridProps) {
  const days = Array.from({ length: habit.totalDays }, (_, index) => index + 1);

  return (
    <View style={styles.grid}>
      {days.map((day) => {
        const isDone = habit.completedDays.includes(day);

        return (
          <DayBlock
            key={day}
            day={day}
            isDone={isDone}
            onPress={() => onToggleDay(day)}
          />
        );
      })}
    </View>
  );
}

type DayBlockProps = {
  day: number;
  isDone: boolean;
  onPress: () => void;
};

function DayBlock({ day, isDone, onPress }: DayBlockProps) {
  const colors = useAppColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useAnimatedReaction(
    () => isDone,
    (currentIsDone, previousIsDone) => {
      if (previousIsDone !== null && previousIsDone !== currentIsDone) {
        // Reanimated shared values are updated from this UI-thread worklet.
        // eslint-disable-next-line react-hooks/immutability
        scale.value = withSequence(
          withSpring(1.16, { damping: 10, stiffness: 260 }),
          withSpring(1, { damping: 12, stiffness: 260 }),
        );
      }
    },
  );

  return (
    <Animated.View
      style={[
        styles.block,
        {
          backgroundColor: isDone
            ? colors.blockActive
            : colors.blockInactive,
        },
        animatedStyle,
      ]}
    >
      <Pressable
        hitSlop={4}
        accessibilityRole="button"
        accessibilityLabel={`Day ${day}, ${isDone ? "completed" : "incomplete"}`}
        onPress={onPress}
        style={({ pressed }) => [
          styles.touchTarget,
          pressed && styles.pressed,
        ]}
      />
    </Animated.View>
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
    overflow: "hidden",
  },
  touchTarget: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
