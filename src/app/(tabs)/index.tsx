import { EmptyState } from "@/components/EmptyState";
import { HabitCard } from "@/components/HabitCard";
import { ProgressRing } from "@/components/ProgressRing";
import AppText from "@/components/ui/AppText";
import { spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { overallProgress } from "@/utils/progress";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const colors = useAppColors();
  const userName = useHabitStore((s) => s.userName);
  const habits = useHabitStore((s) => s.habits);
  const toggleDay = useHabitStore((s) => s.toggleDay);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);

  useEffect(() => {
    const state = useHabitStore.getState();
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    if (
      !state.notificationsEnabled ||
      state.lastReminderDate === today ||
      state.habits.length === 0
    ) {
      return;
    }

    state.markReminderShown(today);
    Alert.alert(
      "A quick check-in",
      "Take a moment to mark today's habit progress.",
    );
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <AppText size={14} color={colors.muted} weight="medium">
              Welcome back
            </AppText>
            <AppText size={28} weight="bold">
              {userName || "Your habits"}
            </AppText>
          </View>

          <ProgressRing
            progress={overallProgress(habits)}
            size={78}
            label="goals"
          />
        </View>

        {habits.length === 0 ? (
          <EmptyState
            title="No habits yet"
            message="Create your first habit from the Create tab and start tracking your streak."
          />
        ) : (
          <View style={styles.cardsList}>
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleDay={(day) => toggleDay(habit.id, day)}
                onDelete={() => deleteHabit(habit.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  cardsList: {
    gap: spacing.md,
  },
});
