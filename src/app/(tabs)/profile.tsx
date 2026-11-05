import AppText from "@/components/ui/AppText";
import { radius, spacing, ThemeMode } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { overallProgress } from "@/utils/progress";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const colors = useAppColors();
  const router = useRouter();
  const userName = useHabitStore((state) => state.userName);
  const habits = useHabitStore((state) => state.habits);
  const deleteAccount = useHabitStore((state) => state.deleteAccount);
  const themeMode = useHabitStore((state) => state.themeMode);
  const setThemeMode = useHabitStore((state) => state.setThemeMode);
  const notificationsEnabled = useHabitStore(
    (state) => state.notificationsEnabled,
  );
  const setNotificationsEnabled = useHabitStore(
    (state) => state.setNotificationsEnabled,
  );
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const progress = overallProgress(habits);
  const completedCheckIns = habits.reduce(
    (total, habit) => total + habit.completedDays.length,
    0,
  );
  const completedHabits = habits.filter(
    (habit) => habit.completedDays.length >= habit.totalDays,
  ).length;

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    setDeletingAccount(true);
    try {
      await deleteAccount();
      router.replace("/onboarding");
    } catch {
      setDeletingAccount(false);
      setDeleteError("Your account could not be deleted. Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.bg }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          <AppText size={13} weight="semibold" color={colors.primary}>
            YOUR SPACE
          </AppText>
          <AppText size={30} weight="bold" style={styles.title}>
            {userName || "Profile"}
          </AppText>
          <AppText color={colors.muted}>
            A snapshot of your consistency.
          </AppText>
        </View>

        <View style={[styles.summary, { backgroundColor: colors.surface }]}>
          <AppText size={16} weight="semibold" style={styles.sectionTitle}>
            Progress summary
          </AppText>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <AppText size={26} weight="bold" color={colors.primary}>
                {habits.length}
              </AppText>
              <AppText size={12} color={colors.muted}>
                Habits
              </AppText>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.stat}>
              <AppText size={26} weight="bold" color={colors.primary}>
                {completedCheckIns}
              </AppText>
              <AppText size={12} color={colors.muted}>
                Check-ins
              </AppText>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.stat}>
              <AppText size={26} weight="bold" color={colors.primary}>
                {completedHabits}
              </AppText>
              <AppText size={12} color={colors.muted}>
                Completed
              </AppText>
            </View>
          </View>
        </View>

        <View
          style={[styles.progressCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.progressHeader}>
            <AppText size={16} weight="semibold">
              Overall progress
            </AppText>
            <AppText size={13} weight="semibold" color={colors.primary}>
              {progress}%
            </AppText>
          </View>
          <View
            style={[styles.progressTrack, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: colors.primary },
              ]}
            />
          </View>
        </View>

        <View style={styles.settingsSection}>
          <AppText size={18} weight="bold" style={styles.sectionTitle}>
            Settings
          </AppText>

          <View
            style={[styles.settingRow, { backgroundColor: colors.surface }]}
          >
            <View style={styles.settingCopy}>
              <AppText size={15} weight="semibold">
                Daily reminder
              </AppText>
              <AppText size={12} color={colors.muted}>
                Show a check-in alert on Dashboard once a day.
              </AppText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              accessibilityLabel="Enable daily in-app reminder"
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View
            style={[styles.themePanel, { backgroundColor: colors.surface }]}
          >
            <AppText size={15} weight="semibold">
              Theme
            </AppText>
            <View style={styles.themeOptions}>
              {(["light", "dark"] as const).map((mode: ThemeMode) => {
                const selected = themeMode === mode;

                return (
                  <Pressable
                    key={mode}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    onPress={() => setThemeMode(mode)}
                    style={[
                      styles.themeOption,
                      {
                        backgroundColor: selected
                          ? colors.primary
                          : colors.surfaceSecondary,
                      },
                    ]}
                  >
                    <AppText
                      size={14}
                      weight="semibold"
                      color={selected ? colors.primaryContrast : colors.text}
                    >
                      {mode === "light" ? "Light" : "Dark"}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.dangerSection}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setDeleteError(null);
              setConfirmingDelete(true);
            }}
            style={styles.deleteOption}
          >
            <AppText size={15} weight="semibold" color="#B42318">
              Delete account
            </AppText>
            <AppText size={12} color={colors.muted}>
              Permanently remove your profile and saved habits.
            </AppText>
          </Pressable>

          {confirmingDelete && (
            <View
              style={[
                styles.deleteConfirmation,
                { backgroundColor: colors.surface },
              ]}
            >
              <AppText size={15} weight="semibold">
                Permanently delete your account?
              </AppText>
              <AppText size={13} color={colors.muted}>
                Your profile, habits, and settings will be erased from this
                device. This cannot be undone.
              </AppText>
              {deleteError && (
                <AppText size={13} color="#B42318">
                  {deleteError}
                </AppText>
              )}
              <View style={styles.deleteActions}>
                <Pressable
                  accessibilityRole="button"
                  disabled={deletingAccount}
                  onPress={() => setConfirmingDelete(false)}
                  style={[
                    styles.deleteAction,
                    { backgroundColor: colors.surfaceSecondary },
                    deletingAccount && styles.disabledAction,
                  ]}
                >
                  <AppText size={14} weight="semibold">
                    Cancel
                  </AppText>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={deletingAccount}
                  onPress={handleDeleteAccount}
                  style={[
                    styles.deleteAction,
                    styles.confirmDeleteButton,
                    deletingAccount && styles.disabledAction,
                  ]}
                >
                  <AppText size={14} weight="semibold" color="#FFFFFF">
                    {deletingAccount ? "Deleting..." : "Delete"}
                  </AppText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heading: {
    marginBottom: spacing.lg,
  },
  title: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  summary: {
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    marginVertical: spacing.xs,
  },
  progressCard: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  settingsSection: {
    marginTop: spacing.xl,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  settingCopy: {
    flex: 1,
    paddingRight: spacing.sm,
    gap: spacing.xs,
  },
  themePanel: {
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  themeOptions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  themeOption: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
  },
  dangerSection: {
    marginTop: spacing.xl,
  },
  deleteOption: {
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  deleteConfirmation: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  deleteActions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  deleteAction: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
  },
  confirmDeleteButton: {
    backgroundColor: "#B42318",
  },
  disabledAction: {
    opacity: 0.6,
  },
});
