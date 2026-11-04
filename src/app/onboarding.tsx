import AppText from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const colors = useAppColors();
  const router = useRouter();
  const setUserName = useHabitStore((s) => s.setUserName);
  const [name, setName] = useState("");

  const handleContinue = () => {
    const cleaned = name.trim();
    if (!cleaned) return;

    setUserName(cleaned);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.brandRow}>
              <View
                style={[styles.brandMark, { backgroundColor: colors.primary }]}
              >
                <AppText size={20} weight="bold" color={colors.primaryContrast}>
                  H
                </AppText>
              </View>
              <AppText size={16} weight="bold">
                Habit Tracker
              </AppText>
            </View>

            <View style={styles.hero}>
              <View
                style={[
                  styles.eyebrow,
                  { backgroundColor: colors.primarySoft },
                ]}
              >
                <View
                  style={[
                    styles.eyebrowDot,
                    { backgroundColor: colors.success },
                  ]}
                />
                <AppText size={11} weight="semibold" color={colors.text}>
                  A FRESH START, ONE DAY AT A TIME
                </AppText>
              </View>
              <AppText size={38} weight="bold" style={styles.title}>
                Make room for{"\n"}better habits.
              </AppText>
              <AppText size={16} color={colors.muted} style={styles.subtitle}>
                Small, consistent steps can make a big difference. Let’s make
                this your space to grow.
              </AppText>
            </View>

            <View
              style={[styles.previewCard, { backgroundColor: colors.primary }]}
            >
              <View style={styles.previewHeader}>
                <AppText
                  size={11}
                  weight="semibold"
                  color={colors.primaryContrast}
                  style={styles.previewEyebrow}
                >
                  YOUR FIRST WEEK
                </AppText>
                <AppText
                  size={12}
                  weight="semibold"
                  color={colors.primaryContrast}
                >
                  0 / 7
                </AppText>
              </View>
              <View style={styles.weekDots}>
                {Array.from({ length: 7 }, (_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.weekDot,
                      {
                        backgroundColor:
                          index === 0 ? colors.success : colors.primaryContrast,
                        opacity: index === 0 ? 1 : 0.22,
                      },
                    ]}
                  />
                ))}
              </View>
              <AppText size={14} weight="medium" color={colors.primaryContrast}>
                Start with one small win.
              </AppText>
            </View>

            <View
              style={[styles.formCard, { backgroundColor: colors.surface }]}
            >
              <AppText size={18} weight="bold" style={styles.formTitle}>
                First, what should we call you?
              </AppText>
              <AppText size={13} color={colors.muted} style={styles.formHint}>
                Your journey is yours. Let’s make it personal.
              </AppText>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                autoCapitalize="words"
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleContinue}
                accessibilityLabel="Your name"
                style={styles.input}
              />
              <Button
                title="Get started"
                onPress={handleContinue}
                disabled={!name.trim()}
                accessibilityLabel="Get started"
              />
            </View>

            <AppText size={12} color={colors.muted} style={styles.footer}>
              Progress over perfection. You’ve got this.
            </AppText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  brandMark: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },
  hero: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
  },
  title: {
    lineHeight: 44,
    letterSpacing: -1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    lineHeight: 24,
  },
  previewCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewEyebrow: {
    letterSpacing: 1,
    opacity: 0.72,
  },
  weekDots: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  weekDot: {
    flex: 1,
    height: 8,
    borderRadius: radius.full,
  },
  formCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  formTitle: {
    marginBottom: spacing.xs,
  },
  formHint: {
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  input: {
    minHeight: 52,
    marginBottom: spacing.md,
  },
  footer: {
    textAlign: "center",
    marginTop: spacing.lg,
  },
});
