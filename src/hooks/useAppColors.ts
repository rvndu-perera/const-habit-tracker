import { getColors } from "@/constants/theme";
import { useHabitStore } from "@/store/useHabitStore";

export function useAppColors() {
  const themeMode = useHabitStore((state) => state.themeMode);
  return getColors(themeMode);
}
