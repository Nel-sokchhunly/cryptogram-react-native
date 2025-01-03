import { Text, TextProps } from "react-native";

export default function BodyText({ children, style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: "Jost_400Regular",
          fontSize: 16,
          color: "white",
          letterSpacing: 0.5,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
