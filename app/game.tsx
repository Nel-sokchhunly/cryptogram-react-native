import { router } from "expo-router";
import BodyText from "@/components/common/BodyText";
import SubHeaderText from "@/components/common/SubHeader";
import TitleText from "@/components/common/TitleText";
import PuzzleView from "@/components/quote/PuzzleView";
import BackgroundBtn from "@/components/common/BackgroundBtn";
import GameHelp from "@/components/game/GameHelp";
import { getRandomQuote } from "@/service/dataset";
import { useState } from "react";

import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

export default function Game() {
  const quote = getRandomQuote();
  const [remainingCheck, setRemainingCheck] = useState(3);

  const handleCheck = () => {
    setRemainingCheck((prev) => prev - 1);
  };

  return (
    <SafeAreaView className="w-full h-screen bg-black">
      <TouchableOpacity
        onPress={() => {
          router.dismissTo("/");
        }}
        className="w-full px-5 flex flex-row items-center"
      >
        <ChevronLeftIcon size={28} color="white" />
        <SubHeaderText>Back</SubHeaderText>
      </TouchableOpacity>
      <View className="w-full p-5 flex flex-row justify-between items-center">
        <TitleText>Quote</TitleText>

        <GameHelp />
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
