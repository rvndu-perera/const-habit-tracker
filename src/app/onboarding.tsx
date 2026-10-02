import AppText from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppColors } from "@/hooks/useAppColors";
import { useHabitStore } from "@/store/useHabitStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
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
      <View style={styles.container}>
        <AppText size={32} weight="bold" style={styles.title}>
          Habit Tracker
        </AppText>
        <AppText size={18} color={colors.muted} style={styles.subtitle}>
          Hello! What should we call you?
        </AppText>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoCapitalize="words"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!name.trim()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});
