import BodyText from "@/components/common/BodyText";
import TitleText from "@/components/common/TitleText";
import { getRandomQuote } from "@/service/dataset";
import { SafeAreaView, View } from "react-native";

export default function Game() {
  const quote = getRandomQuote();

  return (
    <SafeAreaView className="w-full h-screen bg-black">
      <View className="w-full p-5">
        <TitleText>Quote</TitleText>
      </View>

      <View>
        <BodyText>{quote.quote}</BodyText>
      </View>
    </SafeAreaView>
  );
}
