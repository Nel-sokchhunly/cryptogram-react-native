import { Text, TextProps } from "react-native";

export default function TitleText({ children, ...props }: TextProps) {
  return (
    <Text
      style={{
        fontFamily: "Jost_500Medium",
        fontSize: 32,
        color: "white",
        letterSpacing: 1,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
