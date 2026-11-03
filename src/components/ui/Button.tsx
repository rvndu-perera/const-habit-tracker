import AppText from "@/components/ui/AppText";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary";
};

export function Button({
  title,
  variant = "primary",
  style,
  disabled,
  ...props
}: ButtonProps) {
  const colors = useAppColors();

  const buttonStyle = [
    styles.button,
    {
      backgroundColor:
        variant === "primary" ? colors.primary : colors.surfaceSecondary,
    },
    disabled && styles.disabled,
    style,
  ].filter(Boolean) as ViewStyle[];

  // Text colour must always contrast with the button background.
  // primary bg flips between dark (light mode) and light (dark mode),
  // so use primaryContrast which is always the inverse.
  const textColor =
    variant === "primary" ? colors.primaryContrast : colors.text;

  return (
    <Pressable style={buttonStyle} disabled={disabled} {...props}>
      <AppText weight="semibold" size={16} color={textColor}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    minHeight: 54,
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.45,
  },
});
