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
  const hydrated = useHabitStore((s) => s.hydrated);
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
          {hydrated ? (
            <>
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
            </>
          ) : (
            <>
              <View>
                <View
                  style={[
                    styles.skeletonWelcome,
                    { backgroundColor: colors.surfaceSecondary },
                  ]}
                />
                <View
                  style={[
                    styles.skeletonName,
                    { backgroundColor: colors.surfaceSecondary },
                  ]}
                />
              </View>
              <View
                style={[
                  styles.skeletonProgress,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              />
            </>
          )}
        </View>
      </View>

      {/* Scrollable Habit Cards */}
      {hydrated ? (
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
      ) : (
        <View
          style={[styles.scrollView, styles.loadingContainer]}
          accessible
          accessibilityLabel="Loading habits"
        >
          {[0, 1].map((item) => (
            <View
              key={item}
              style={[styles.skeletonCard, { backgroundColor: colors.surface }]}
            >
              <View
                style={[
                  styles.skeletonHabitTitle,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              />
              <View
                style={[
                  styles.skeletonHabitSubtitle,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              />
              <View style={styles.skeletonMetaRow}>
                <View
                  style={[
                    styles.skeletonMeta,
                    { backgroundColor: colors.surfaceSecondary },
                  ]}
                />
                <View
                  style={[
                    styles.skeletonMeta,
                    { backgroundColor: colors.surfaceSecondary },
                  ]}
                />
              </View>
              <View style={styles.skeletonDays}>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.skeletonDay,
                      { backgroundColor: colors.surfaceSecondary },
                    ]}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

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
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  cardsList: {
    gap: spacing.md,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: spacing.md,
  },
  skeletonWelcome: {
    width: 96,
    height: 12,
    borderRadius: radius.full,
    marginBottom: 8,
  },
  skeletonName: {
    width: 148,
    height: 24,
    borderRadius: radius.full,
  },
  skeletonProgress: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
  },
  skeletonCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  skeletonHabitTitle: {
    width: "58%",
    height: 18,
    borderRadius: radius.full,
  },
  skeletonHabitSubtitle: {
    width: 76,
    height: 12,
    borderRadius: radius.full,
    marginTop: 8,
  },
  skeletonMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 14,
  },
  skeletonMeta: {
    width: 72,
    height: 13,
    borderRadius: radius.full,
  },
  skeletonDays: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skeletonDay: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
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
