import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity } from "react-native";
import BodyText from "@/components/common/BodyText";
import TitleText from "@/components/common/TitleText";

import backgroundImg from "@/assets/images/cryptogram-bg.jpg";

export default function Homescreen() {
  const handleStartGame = () => {
    router.push("/game");
  };

  return (
    <SafeAreaView className="flex justify-center items-center h-screen bg-black ">
      <View className="h-3/5 w-full flex justify-center items-center relative ">
        <TitleText className="z-10">Cryptogram</TitleText>

        <Image
          source={backgroundImg}
          className="w-full h-full absolute top-0 left-0 -z-10 opacity-30"
        />
      </View>

      <View className="h-2/5 flex justify-center items-center">
        <TouchableOpacity onPress={handleStartGame}>
          <BodyText>Start Game</BodyText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
