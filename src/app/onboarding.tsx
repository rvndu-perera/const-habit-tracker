import AppText from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const colors = useAppColors();
  const themeMode = useHabitStore((s) => s.themeMode);
  const isDark = themeMode === "dark";
  const router = useRouter();
  const setUserName = useHabitStore((s) => s.setUserName);
  const [name, setName] = useState("");

  // Smooth entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 45,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, logoScale]);

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
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header / Brand with Logo */}
            <View style={styles.brandContainer}>
              <Animated.View
                style={[
                  styles.logoWrapper,
                  {
                    transform: [{ scale: logoScale }],
                    borderColor: isDark ? colors.border : "rgba(0,0,0,0.06)",
                  },
                ]}
              >
                <Image
                  source={require("@/../assets/images/logo-habitrack.png")}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </Animated.View>

              <AppText size={26} weight="bold" style={styles.appName}>
                HabiTrack
              </AppText>

              {/* Minimal quote */}
              <AppText size={14} color={colors.muted} style={styles.quoteText}>
                Small steps every day lead to big changes.
              </AppText>
            </View>

            {/* Floating Input Card with extra soft, diffused shadow */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor: isDark ? colors.border : "rgba(0,0,0,0.05)",
                  borderWidth: isDark ? 1 : 0.8,
                  // Very soft, high-diffusion blur shadow (no harsh edges)
                  shadowColor: "#989898ff",
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: isDark ? 0 : 0.045,
                  shadowRadius: 30,
                  elevation: isDark ? 0 : 3,
                },
              ]}
            >
              <AppText size={18} weight="bold" style={styles.questionTitle}>
                What should we call you?
              </AppText>
              <AppText
                size={13}
                color={colors.muted}
                style={styles.questionSubtitle}
              >
                Let’s make this space feel like yours.
              </AppText>

              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                autoCapitalize="words"
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleContinue}
                accessibilityLabel="Your name"
                style={styles.input}
              />

              <Button
                title="Continue"
                onPress={handleContinue}
                disabled={!name.trim()}
                accessibilityLabel="Continue"
              />
            </View>

            {/* Minimal footer */}
            <View style={styles.footer}>
              <AppText
                size={11}
                color={colors.muted}
                style={{ letterSpacing: 0.2 }}
              >
                Private & stored only on your device
              </AppText>
            </View>
          </Animated.View>
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
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logoWrapper: {
    width: 76,
    height: 76,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: spacing.md,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  appName: {
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  quoteText: {
    textAlign: "center",
    lineHeight: 20,
    fontStyle: "normal",
    paddingHorizontal: spacing.md,
  },
  card: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  questionTitle: {
    marginBottom: 4,
  },
  questionSubtitle: {
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  input: {
    minHeight: 52,
    marginBottom: spacing.lg,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.sm,
  },
});
