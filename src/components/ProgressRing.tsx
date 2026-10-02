import { useAppColors } from "@/hooks/useAppColors";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import AppText from "./ui/AppText";

type ProgressRingProps = {
  progress: number;
  size?: number;
  label?: string;
};

export function ProgressRing({
  progress,
  size = 90,
  label = "done",
}: ProgressRingProps) {
  const colors = useAppColors();
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          stroke={colors.border}
          fill="none"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <Circle
          stroke={colors.primary}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </Svg>
      <View style={styles.centerBadge} pointerEvents="none">
        <AppText weight="bold" size={18} style={styles.percentText}>
          {Math.round(progress)}%
        </AppText>
      </View>
      <AppText size={11} color={colors.muted} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerBadge: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    textAlign: "center",
  },
  label: {
    marginTop: 4,
  },
});
