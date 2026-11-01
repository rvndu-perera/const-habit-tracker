import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

type DayGridProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
};

const GAP = 8;
const COLUMNS = 7;

export function DayGrid({ habit, onToggleDay }: DayGridProps) {
  const colors = useAppColors();
  const { width: windowWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const days = Array.from({ length: habit.totalDays }, (_, index) => index + 1);

  // Available width fallback before measurement: screen width - screenPadding(32) - cardPadding(40)
  const effectiveWidth = containerWidth > 0 ? containerWidth : Math.max(280, windowWidth - 72);
  const calculatedSize = Math.floor((effectiveWidth - (COLUMNS - 1) * GAP) / COLUMNS);
  const blockSize = Math.max(28, Math.min(48, calculatedSize));

  const handlePress = (day: number) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics is non-blocking
    }
    onToggleDay(day);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && Math.abs(width - containerWidth) > 1) {
      setContainerWidth(width);
    }
  };

  return (
    <View style={styles.grid} onLayout={handleLayout}>
      {days.map((day) => {
        const isDone = habit.completedDays.includes(day);

        return (
          <Pressable
            key={day}
            accessibilityRole="button"
            accessibilityLabel={`Day ${day}, ${isDone ? "completed" : "incomplete"}`}
            onPress={() => handlePress(day)}
            style={({ pressed }) => [
              styles.block,
              {
                width: blockSize,
                height: blockSize,
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

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    alignItems: "center",
  },
  block: {
    borderRadius: 6,
  },
});
