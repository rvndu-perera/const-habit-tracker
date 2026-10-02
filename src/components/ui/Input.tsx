import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  const colors = useAppColors();

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.muted}
      style={[
        styles.input,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    marginBottom: spacing.md,
  },
});
