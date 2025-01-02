import { Text } from "react-native";
import { useFonts, Jost_400Regular } from "@expo-google-fonts/jost";

export default function BodyText({ children }: { children: string }) {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
  });

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
