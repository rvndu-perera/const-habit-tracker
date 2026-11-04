import AppText from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { radius } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { DURATIONS, TotalDays } from "@/types/habit";
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
      {/* Sticky header card */}
      <View style={styles.headerWrapper}>
        <View style={[styles.headerCard, { backgroundColor: colors.surface }]}>
          <AppText size={13} weight="semibold" color={colors.muted}>
            BUILD A ROUTINE
          </AppText>
          <AppText size={28} weight="bold" color={colors.text}>
            Start a habit
          </AppText>
          <AppText size={14} color={colors.muted}>
            Choose one thing you want to make time for.
          </AppText>
        </View>
      </View>

      {/* Keyboard avoiding + scrollable body */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Habit name */}
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

          {/* Focus period */}
          <View style={styles.durationSection}>
            <View style={styles.durationHeading}>
              <AppText size={14} weight="semibold" color={colors.text}>
                Focus period
              </AppText>
              <AppText size={13} color={colors.muted}>
                {duration} days
              </AppText>
            </View>

            <View style={styles.durationGrid}>
              {[
                DURATIONS.slice(0, 2),
                DURATIONS.slice(2, 4),
                DURATIONS.slice(4, 6),
              ].map((row, rowIndex) => (
                <View key={rowIndex} style={styles.durationRow}>
                  {row.map((days) => {
                    const selected = duration === days;
                    return (
                      <Pressable
                        key={days}
                        onPress={() => setDuration(days)}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selected }}
                        accessibilityLabel={`${days} days`}
                        style={[
                          styles.durationChip,
                          {
                            backgroundColor: selected
                              ? colors.primary
                              : colors.surface,
                          },
                        ]}
                      >
                        <AppText
                          size={15}
                          weight="bold"
                          color={
                            selected ? colors.primaryContrast : colors.text
                          }
                        >
                          {days}
                        </AppText>
                        <AppText
                          size={11}
                          weight="medium"
                          color={
                            selected ? colors.primaryContrast : colors.muted
                          }
                        >
                          days
                        </AppText>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          {/* Save button */}
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
  // Header card (sticky, outside ScrollView)
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerCard: {
    borderRadius: radius.xl,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
    gap: 4,
  },
  // ScrollView content
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  // Habit name field
  field: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 0,
    minHeight: 54,
  },
  counter: {
    alignSelf: "flex-end",
    marginTop: 4,
  },
  // Duration section
  durationSection: {
    marginBottom: 24,
  },
  durationHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  durationGrid: {
    gap: 10,
  },
  durationRow: {
    flexDirection: "row",
    gap: 10,
  },
  durationChip: {
    flex: 1,
    height: 72,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  // Save button
  saveSection: {
    marginTop: "auto",
  },
});
