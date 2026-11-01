import { EmptyState } from "@/components/EmptyState";
import { HabitCard } from "@/components/HabitCard";
import { ProgressRing } from "@/components/ProgressRing";
import AppText from "@/components/ui/AppText";
import { radius, spacing } from "@/constants/theme";
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.headerCard, { backgroundColor: colors.surface }]}>
          <View>
            <AppText
              size={14}
              color={colors.muted}
              weight="medium"
              style={styles.welcomeText}
            >
              Welcome back
            </AppText>
            <AppText
              size={30}
              weight="bold"
              color={colors.text}
              style={styles.userNameText}
            >
              {userName || "Your habits"}
            </AppText>
          </View>

          <ProgressRing progress={overallProgress(habits)} size={52} />
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  headerCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  welcomeText: {
    marginBottom: 4,
  },
  userNameText: {
    letterSpacing: -0.5,
  },
  cardsList: {
    gap: spacing.md,
  },
});
