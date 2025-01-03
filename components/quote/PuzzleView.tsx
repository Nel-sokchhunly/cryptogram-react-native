import { View, StyleSheet } from "react-native";
import { identifyCharType } from "@/utils/qoute";
import Space from "./Space";
import Symbol from "./Symbol";
import CharText from "./CharText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { gameActions } from "@/store/gameSlicer";

export default function PuzzleView() {
  const {
    quote,
    alphaInput,
    quoteChars: chars,
    shiftAmount,
  } = useSelector((state: RootState) => state.gameMachine);
  const dispatch = useDispatch();

  if (!quote) {
    return null;
  }

  return (
    <View style={styles.container}>
      {chars.map((letter, index) => {
        const type = identifyCharType(letter);

        switch (type) {
          case "alphabet":
            return (
              <CharText
                key={index}
                char={letter}
                inputValue={alphaInput[letter]?.inputValue || null}
                shiftAmount={shiftAmount}
                guessDiff={alphaInput[letter]?.guessDiff}
                showCheck={alphaInput[letter]?.showCheck || false}
                onInputChange={(char, input) =>
                  dispatch(gameActions.updateAlphaInput({ char, input }))
                }
              />
            );
          case "space":
            return <Space key={index} />;
          case "symbol":
            return <Symbol key={index} char={letter} />;
          default:
            return null;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 2,
    flexWrap: "wrap",
    padding: 20,
  },
});
