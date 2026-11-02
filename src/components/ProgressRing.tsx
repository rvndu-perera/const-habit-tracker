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
  size = 54,
  strokeWidth = 3.5,
  label,
}: ProgressRingProps) {
  const colors = useAppColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clamped / 100) * circumference;
  const innerSize = size - strokeWidth * 2 - 4;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Visible light-grey circular track */}
          <Circle
            stroke={colors.badgeTrack}
            fill="transparent"
            strokeWidth={strokeWidth}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          {/* Distinct dark progress indicator arc */}
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
        {/* Dark inner circle badge with bold white percentage */}
        <View
          style={[
            styles.innerCircle,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              backgroundColor: colors.badgeBg,
            },
          ]}
          pointerEvents="none"
        >
          <AppText
            weight="bold"
            size={12}
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

export default ProgressRing;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  innerCircle: {
    position: "absolute",
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
