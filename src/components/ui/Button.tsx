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
        variant === "primary" ? colors.primary : colors.primarySoft,
    },
    disabled && styles.disabled,
    style,
  ].filter(Boolean) as ViewStyle[];

  return (
    <Pressable style={buttonStyle} disabled={disabled} {...props}>
      <AppText
        weight="semibold"
        size={16}
        color={variant === "primary" ? "#fff" : colors.text}
      >
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    minHeight: 50,
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
});
