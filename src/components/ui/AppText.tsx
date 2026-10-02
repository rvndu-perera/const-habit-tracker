import { fonts } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Text, TextProps } from "react-native";

type Props = TextProps & {
  weight?: keyof typeof fonts;
  size?: number;
  color?: string;
};

export default function AppText({
  weight = "regular",
  size = 15,
  color: colorProp,
  style,
  ...rest
}: Props) {
  const colors = useAppColors();
  const color = colorProp ?? colors.text;

  return (
    <Text
      style={[{ fontFamily: fonts[weight], fontSize: size, color }, style]}
      {...rest}
    />
  );
}
