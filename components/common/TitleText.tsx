import { Text, TextProps } from "react-native";
import { useFonts, Jost_500Medium } from "@expo-google-fonts/jost";

export default function TitleText({ children, ...props }: TextProps) {
  let [fontsLoaded] = useFonts({
    Jost_500Medium,
  });

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
