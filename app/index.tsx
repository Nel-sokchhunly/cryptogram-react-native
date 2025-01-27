import { router } from "expo-router";

import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
} from "react-native";
import BodyText from "@/components/common/BodyText";
import TitleText from "@/components/common/TitleText";
import { gameActions } from "@/store/reducers/gameSlicer";
import backgroundImg from "@/assets/images/cryptogram-bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import GameHelpBottomSheet from "@/components/game/GameHelp";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import { RootState } from "@/store";

export default function Homescreen() {
  const dispatch = useDispatch();
  const { quote: unlockedQuotes } = useSelector(
    (state: RootState) => state.unlockedQuotes
  );

  const handleStartGame = () => {
    dispatch(gameActions.startGame());
    router.push("/game");
  };

  const scaleAnim = useAnimatedValue(0.9);
  const opacityAnim = useAnimatedValue(0.2);

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
        ]),
      ])
    ).start();
  };

  const stopScaleAnim = () => {
    scaleAnim.setValue(1);
  };

  useEffect(() => {
    startScaleAnim();

    return () => {
      stopScaleAnim();
    };
  }, []);

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

      <View className="h-2/5 flex justify-center items-center gap-10">
        <TouchableOpacity onPress={handleStartGame}>
          <BodyText>Start Game</BodyText>
        </TouchableOpacity>

        <BodyText>Unlocked Quotes: {unlockedQuotes.length}</BodyText>

        <GameHelpBottomSheet>
          <View
            style={{
              padding: 2,
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <QuestionMarkCircleIcon size={40} color="black" />
          </View>
        </GameHelpBottomSheet>
      </View>
    </SafeAreaView>
  );
}
