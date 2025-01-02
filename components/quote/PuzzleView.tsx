import { Quote } from "@/types/qoute";
import { View, StyleSheet } from "react-native";
import { identifyCharType } from "@/utils/qoute";
import Space from "./Space";
import Symbol from "./Symbol";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import CharText from "./CharText";
import { TextInput } from "react-native-gesture-handler";

type AlphabetSet = Map<string, string | null>;

export default function PuzzleView({ quote }: { quote: Quote }) {
  const [alphaInput, setAlphaInput] = useState<AlphabetSet>(new Map());
  const chars = useMemo(() => quote.quote.split(""), [quote.quote, alphaInput]);
  const shiftAmount = useMemo(() => {
    // how many number of character to shift the actual character to decrypted the text
    // random from -10 to 10 and not 0
    const shiftAmount = Math.floor(Math.random() * 20) - 10;
    return shiftAmount;
  }, [quote]);

  useEffect(() => {
    const alphas = new Map() as AlphabetSet;

    chars.forEach((char) => {
      if (identifyCharType(char) === "alphabet") {
        alphas.set(char, null);
      }
    });

    setAlphaInput(alphas);
  }, [quote.quote]);

  if (!chars) {
    return;
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
                inputValue={alphaInput.get(letter) || null}
                shiftAmount={shiftAmount}
                onInputChange={(char, input) => {
                  setAlphaInput((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(char, input);
                    return newMap;
                  });
                }}
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
