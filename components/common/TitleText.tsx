import { Text, TextProps } from "react-native";

export default function TitleText({ children, style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: "Jost_500Medium",
          fontSize: 32,
          color: "white",
          letterSpacing: 1,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
