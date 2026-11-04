import { EmptyState } from "@/components/EmptyState";
import { HabitCard } from "@/components/HabitCard";
import { ProgressRing } from "@/components/ProgressRing";
import AppText from "@/components/ui/AppText";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { overallProgress } from "@/utils/progress";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const colors = useAppColors();
  const [showReminder, setShowReminder] = useState(false);
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
    const reminderTimer = setTimeout(() => setShowReminder(true), 0);
    return () => clearTimeout(reminderTimer);
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.bg }]}
      edges={["top", "left", "right"]}
    >
      {/* Sticky Header Card with floating soft shadow */}
      <View style={styles.headerWrapper}>
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
      </View>

      {/* Scrollable Habit Cards */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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

      <Modal
        transparent
        visible={showReminder}
        animationType="fade"
        onRequestClose={() => setShowReminder(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.reminderCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <AppText size={18} weight="bold">
              A quick check-in
            </AppText>
            <AppText
              size={14}
              color={colors.muted}
              style={styles.reminderMessage}
            >
              Take a moment to mark today&apos;s habit progress.
            </AppText>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowReminder(false)}
              style={[
                styles.reminderButton,
                { backgroundColor: colors.surfaceSecondary },
              ]}
            >
              <AppText size={14} weight="semibold">
                Got it
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 10,
  },
  headerCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
  },
  welcomeText: {
    marginBottom: 4,
  },
  userNameText: {
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  cardsList: {
    gap: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  reminderCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  reminderMessage: {
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  reminderButton: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    marginTop: spacing.lg,
  },
});
