import BodyText from "@/components/common/BodyText";
import SubHeaderText from "@/components/common/SubHeader";
import TitleText from "@/components/common/TitleText";
import PuzzleView from "@/components/quote/PuzzleView";
import BackgroundBtn from "@/components/common/BackgroundBtn";
import { getRandomQuote } from "@/service/dataset";
import { useState } from "react";

import { SafeAreaView, View } from "react-native";

export default function Game() {
  const quote = getRandomQuote();
  const [remainingCheck, setRemainingCheck] = useState(6);

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

      {/* actions */}

      <View className="w-full flex gap-5 p-5">
        <BodyText>Remaining check: {remainingCheck}</BodyText>
        <BackgroundBtn
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Check
        </BackgroundBtn>

      </View>
    </SafeAreaView>
  );
}
