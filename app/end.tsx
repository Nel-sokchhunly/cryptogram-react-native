import SubHeaderText from "@/components/common/SubHeader";
import { RootState } from "@/store";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";

export default function End() {
  const { quote, timer, checkAttempts } = useSelector(
    (state: RootState) => state.gameMachine
  );

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
    </SafeAreaView>
  );
}
