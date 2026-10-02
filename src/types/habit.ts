export type TotalDays = 5 | 7 | 10 | 15 | 30 | 90;
export const DURATIONS: TotalDays[] = [5, 7, 10, 15, 30, 90];

export type Habit = {
  id: string;
  name: string;
  totalDays: TotalDays;
  startDate: string;
  completedDays: number[];
};
