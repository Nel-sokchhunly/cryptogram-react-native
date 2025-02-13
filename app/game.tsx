import { router, useNavigation } from "expo-router";
import BodyText from "@/components/common/BodyText";
import SubHeaderText from "@/components/common/SubHeader";
import PuzzleView from "@/components/quote/PuzzleView";
import BackgroundBtn from "@/components/common/BackgroundBtn";

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from "react-native";
import {
  ChevronLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { gameActions } from "@/store/reducers/gameSlicer";
import GameHelpBottomSheet from "@/components/game/GameHelp";
import { useEffect, useRef, useState } from "react";
import { formatSeconds } from "@/utils/format";
import { unlockedQuoteActions } from "@/store/reducers/unlockedQuoteSlicer";

export default function Game() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    quote,
    state: gameStatus,
    timer,
    checkAttempts,
  } = useSelector((state: RootState) => state.gameMachine);
  const stopwatchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCheck = () => {
    Keyboard.dismiss();
    dispatch(gameActions.checkAnswer({}));
  };

  if (!quote)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <BodyText>Loading...</BodyText>
      </View>
    );

  // game timer
  useEffect(() => {
    if (gameStatus === "playing") {
      stopwatchTimerRef.current = setInterval(() => {
        dispatch(gameActions.incrementTimer());
      }, 1000);
    } else if (gameStatus === "ended") {
      if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
      dispatch(
        unlockedQuoteActions.addQuote({
          quote,
          timer,
          checkAttempts,
          unlockedAt: new Date().getTime(),
        })
      );
      router.push("/end");
    }

    return () => {
      if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
    };
  }, [gameStatus]);

  // prompt user to confirm leaving the game
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert(
        "Exit Game?",
        "Your game progress will be lost if you leave now. Do you want to continue?",
        [
          { text: "Continue Playing", style: "cancel" },
          {
            text: "Leave Game",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation]);

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
      <View
        style={{
          padding: 20,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View>
          <View className="flex flex-row items-center ">
            <SubHeaderText>Time: </SubHeaderText>
            <SubHeaderText>
              {Math.floor(timer / 60)}:{formatSeconds(timer % 60)}
            </SubHeaderText>
          </View>
          <View className="flex flex-row items-center ">
            <SubHeaderText>Checks: </SubHeaderText>
            <SubHeaderText>{checkAttempts}</SubHeaderText>
          </View>
        </View>

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

      <PuzzleView />

      <View className="w-full p-5">
        <SubHeaderText>Author: {quote.author}</SubHeaderText>
        <BodyText>Tags: {quote.tags.join(", ")}</BodyText>
      </View>

      {/* actions */}
      <View className="w-full flex gap-5 p-5">
        <BackgroundBtn
          onPress={handleCheck}
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
