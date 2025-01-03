import { router } from "expo-router";

import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, Animated, useAnimatedValue } from "react-native";
import BodyText from "@/components/common/BodyText";
import TitleText from "@/components/common/TitleText";

import backgroundImg from "@/assets/images/cryptogram-bg.jpg";

export default function Homescreen() {
  const handleStartGame = () => {
    router.push("/game");
  };

  const scaleAnim = useAnimatedValue(0.9)
  const opacityAnim = useAnimatedValue(0.2)

  const startScaleAnim = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 10000,
            useNativeDriver: true,
          }),

        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.2,
            duration: 10000,
            useNativeDriver: true,
          }),

        ])
      ]),
    ).start();
  }

  const stopScaleAnim = () => {
    scaleAnim.setValue(1);
  }


  useEffect(() => {
    startScaleAnim();

    return () => {
      stopScaleAnim();
    }
  }, [])

  return (
    <SafeAreaView className="flex justify-center items-center h-screen bg-black ">
      <View className="h-3/5 w-full flex justify-center items-center relative ">
        <TitleText className="z-10">Cryptogram</TitleText>

        <Animated.Image
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          source={backgroundImg}
          className="w-full h-full absolute top-0 left-0 -z-10"
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
