import { Text, TextProps } from "react-native";

export default function BodyText({ children, ...props }: TextProps) {
  return (
    <Text
      style={{
        fontFamily: "Jost_400Regular",
        fontSize: 16,
        color: "white",
      }}
    >
      {children}
    </Text>
  );
}
