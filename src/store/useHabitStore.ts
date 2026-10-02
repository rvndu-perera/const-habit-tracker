import { ThemeMode } from "@/constants/theme";
import { Habit, TotalDays } from "@/types/habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  userName: string | null;
  habits: Habit[];
  hydrated: boolean;
  themeMode: ThemeMode;
  notificationsEnabled: boolean;
  lastReminderDate: string | null;
  setUserName: (name: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  markReminderShown: (date: string) => void;
  addHabit: (name: string, totalDays: TotalDays) => void;
  toggleDay: (id: string, day: number) => void;
  deleteHabit: (id: string) => void;
};

export const useHabitStore = create<State>()(
  persist(
    (set) => ({
      userName: null,
      habits: [],
      hydrated: false,
      themeMode: "light",
      notificationsEnabled: false,
      lastReminderDate: null,
      setUserName: (name) => set({ userName: name.trim() }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setNotificationsEnabled: (notificationsEnabled) =>
        set({ notificationsEnabled }),
      markReminderShown: (lastReminderDate) => set({ lastReminderDate }),
      addHabit: (name, totalDays) =>
        set((s) => ({
          habits: [
            ...s.habits,
            {
              id: Date.now().toString(),
              name: name.trim(),
              totalDays,
              startDate: new Date().toISOString(),
              completedDays: [],
            },
          ],
        })),
      toggleDay: (id, day) =>
        set((s) => ({
          habits: s.habits.map((h) =>
            h.id !== id
              ? h
              : {
                  ...h,
                  completedDays: h.completedDays.includes(day)
                    ? h.completedDays.filter((d) => d !== day)
                    : [...h.completedDays, day],
                },
          ),
        })),
      deleteHabit: (id) =>
        set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
    }),
    {
      name: "habit-tracker-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        userName: s.userName,
        habits: s.habits,
        themeMode: s.themeMode,
        notificationsEnabled: s.notificationsEnabled,
        lastReminderDate: s.lastReminderDate,
      }),
      onRehydrateStorage: () => () =>
        useHabitStore.setState({ hydrated: true }),
    },
  ),
);
