import AppText from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { DURATIONS, TotalDays } from "@/types/habit";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateHabitScreen() {
  const colors = useAppColors();
  const router = useRouter();
  const addHabit = useHabitStore((state) => state.addHabit);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState<TotalDays>(7);

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    // Trim here as well as in the disabled state so whitespace cannot create a habit.
    const habitName = name.trim();
    if (!habitName) return;

    addHabit(habitName, duration);
    setName("");
    setDuration(7);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.bg }]}
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heading}>
            <AppText size={13} weight="semibold" color={colors.primary}>
              BUILD A ROUTINE
            </AppText>
            <AppText size={30} weight="bold" style={styles.title}>
              Start a habit
            </AppText>
            <AppText color={colors.muted}>
              Choose one thing you want to make time for.
            </AppText>
          </View>

          <View style={styles.field}>
            <AppText size={14} weight="semibold" style={styles.label}>
              Habit name
            </AppText>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="For example, morning walk"
              autoCapitalize="sentences"
              autoCorrect
              maxLength={50}
              returnKeyType="done"
              accessibilityLabel="Habit name"
              style={styles.input}
            />
            <AppText size={12} color={colors.muted} style={styles.counter}>
              {name.length}/50
            </AppText>
          </View>

          <View style={styles.durationSection}>
            <View style={styles.durationHeading}>
              <AppText size={14} weight="semibold">
                Focus period
              </AppText>
              <AppText size={13} color={colors.muted}>
                {duration} days
              </AppText>
            </View>

            <View style={styles.durationGrid}>
              {DURATIONS.map((days) => {
                const selected = duration === days;

                return (
                  <Pressable
                    key={days}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    accessibilityLabel={`${days} days`}
                    onPress={() => setDuration(days)}
                    style={({ pressed }) => [
                      styles.durationOption,
                      {
                        backgroundColor: selected
                          ? colors.primarySoft
                          : colors.surface,
                        borderColor: selected ? colors.primary : colors.border,
                      },
                      pressed && styles.durationOptionPressed,
                    ]}
                  >
                    <View style={styles.optionTopRow}>
                      <AppText
                        size={22}
                        weight="bold"
                        color={selected ? colors.primary : colors.text}
                      >
                        {days}
                      </AppText>
                      {selected ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color={colors.primary}
                        />
                      ) : null}
                    </View>
                    <AppText size={12} color={colors.muted}>
                      days
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.saveSection}>
            <Button
              title="Create habit"
              onPress={handleSave}
              disabled={!canSave}
              accessibilityLabel="Create habit"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  heading: {
    marginBottom: spacing.xl,
  },
  title: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  field: {
    marginBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.sm,
  },
  input: {
    marginBottom: 0,
    minHeight: 54,
  },
  counter: {
    alignSelf: "flex-end",
    marginTop: spacing.xs,
  },
  durationSection: {
    marginBottom: spacing.xl,
  },
  durationHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  durationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.sm,
  },
  durationOption: {
    width: "31.5%",
    minHeight: 82,
    padding: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    justifyContent: "center",
  },
  durationOptionPressed: {
    opacity: 0.75,
  },
  optionTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  saveSection: {
    marginTop: "auto",
  },
});
