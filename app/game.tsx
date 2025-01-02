import BodyText from "@/components/common/BodyText";
import SubHeaderText from "@/components/common/SubHeader";
import TitleText from "@/components/common/TitleText";
import PuzzleView from "@/components/quote/PuzzleView";
import { getRandomQuote } from "@/service/dataset";

import { SafeAreaView, View } from "react-native";

export default function Game() {
  const quote = getRandomQuote();

  return (
    <SafeAreaView className="w-full h-screen bg-black">
      <View className="w-full p-5">
        <TitleText>Quote</TitleText>
      </View>

      <PuzzleView quote={quote} />

      <View className="w-full p-5">
        <SubHeaderText>Author: {quote.author}</SubHeaderText>
        <BodyText>Tags: {quote.tags.join(", ")}</BodyText>
      </View>
    </SafeAreaView>
  );
}
