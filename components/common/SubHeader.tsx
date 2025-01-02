import { Text, TextProps } from "react-native";

export default function SubHeaderText({ children, ...props }: TextProps) {
  return (
    <Text
      style={{
        fontFamily: "Jost_500Medium",
        fontSize: 24,
        color: "white",
        letterSpacing: 1,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
