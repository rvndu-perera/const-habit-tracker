import { Habit } from "@/types/habit";

export const habitProgress = (h: Habit) =>
  Math.round((h.completedDays.length / h.totalDays) * 100);

export const overallProgress = (habits: Habit[]) => {
  const total = habits.reduce((a, h) => a + h.totalDays, 0);
  const done = habits.reduce((a, h) => a + h.completedDays.length, 0);
  return total === 0 ? 0 : Math.round((done / total) * 100);
};
