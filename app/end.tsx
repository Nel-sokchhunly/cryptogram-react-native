import BackgroundBtn from "@/components/common/BackgroundBtn";
import SubHeaderText from "@/components/common/SubHeader";
import { RootState } from "@/store";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";

export default function End() {
  const { quote, timer, checkAttempts } = useSelector(
    (state: RootState) => state.gameMachine
  );

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
        display: "flex",
        height: "100%",
      }}
    >
      <View
        style={{
          height: "20%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <SubHeaderText
          style={{
            textAlign: "center",
          }}
        >
          🎉 Congratulations! 🎉{"\n"}You've Unlocked the Quote:
        </SubHeaderText>
      </View>
      <View
        style={{
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SubHeaderText
          style={{
            textAlign: "center",
          }}
        >
          {quote?.quote}
        </SubHeaderText>
      </View>
      <View
        style={{
          height: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BackgroundBtn onPress={handleBackHome}>Home</BackgroundBtn>
      </View>
    </SafeAreaView>
  );
}
