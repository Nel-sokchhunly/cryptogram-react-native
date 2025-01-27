import { Text, TextProps } from "react-native";

export default function SubHeaderText({
  children,
  style,
  ...props
}: TextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: "Jost_500Medium",
          fontSize: 24,
          color: "white",
          textAlign: "center",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
