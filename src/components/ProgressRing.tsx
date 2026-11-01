import AppText from "@/components/ui/AppText";
import { useAppColors } from "@/hooks/useAppColors";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type ProgressRingProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
};

export function ProgressRing({
  progress,
  size = 52,
  strokeWidth = 3,
  label,
}: ProgressRingProps) {
  const colors = useAppColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.badgeBg,
          },
        ]}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            stroke={colors.badgeTrack}
            fill="transparent"
            strokeWidth={strokeWidth}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          {clamped > 0 ? (
            <Circle
              stroke={colors.badgeIndicator}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              cx={size / 2}
              cy={size / 2}
              r={radius}
            />
          ) : null}
        </Svg>
        <View style={styles.centerBadge} pointerEvents="none">
          <AppText
            weight="bold"
            size={size <= 56 ? 12 : 16}
            color={colors.badgeText}
            style={styles.percentText}
          >
            {Math.round(clamped)}%
          </AppText>
        </View>
      </View>
      {label ? (
        <AppText size={11} color={colors.muted} style={styles.label}>
          {label}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  centerBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
