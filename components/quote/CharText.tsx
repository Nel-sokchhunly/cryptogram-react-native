import { toast } from "@backpackapp-io/react-native-toast";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  useAnimatedValue,
  Animated,
} from "react-native";

export default function CharText({
  char,
  inputValue,
  onInputChange,
  shiftAmount,
  guessDiff, // difference between the guess and the correct answer
  showCheck,
  darkMode = true,
}: {
  char: string;
  inputValue: string | null;
  onInputChange: (char: string, input: string) => void;
  shiftAmount: number;
  guessDiff?: number;
  showCheck: boolean;
  darkMode?: boolean;
}) {
  const [input, setInput] = useState(inputValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInput(inputValue);
  }, [inputValue]);

  // focus animation
  const fadeAnim = useAnimatedValue(0);
  const startPulsing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  const stopPulsing = () => {
    fadeAnim.setValue(0);
  };

  useEffect(() => {
    if (isFocused) {
      startPulsing();
    } else {
      stopPulsing();
    }
  }, [isFocused]);

  // shift the character based on the shiftAmount
  // example: shiftAmount = 1, char = "A" => "B"
  const shiftedChar = String.fromCharCode(
    ((char.charCodeAt(0) - 65 + shiftAmount + 26) % 26) + 65
  );

  const diffStyle = () => {
    if (guessDiff === undefined || !showCheck) return;
    console.log("====================================");
    console.log("guessDiff", guessDiff);
    console.log("====================================");
    if (guessDiff <= 3) {
      return styles.range3Diff;
    }
    if (guessDiff <= 6) {
      return styles.range6Diff;
    }
    if (guessDiff <= 10) {
      return styles.range10Diff;
    }
    if (guessDiff > 10) {
      return styles.notInRangeDiff;
    }
  };

  return (
    <View style={[styles.container]}>
      <View className="w-fit h-fit relative">
        <TextInput
          style={[
            styles.input,
            {
              borderColor: darkMode ? "white" : "black",
              color: darkMode ? "white" : "black",
            },
            diffStyle(),
            isFocused && {
              backgroundColor: "transparent",
              color: "white",
              borderColor: "yellow",
              borderWidth: 1,
            },
          ]}
          // autoFocus
          maxLength={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={input || ""}
          autoCapitalize="characters"
          onChange={(e) => {
            e.preventDefault();
            // only accept uppercase letter
            if (!/^[A-Z]*$/.test(e.nativeEvent.text)) {
              toast("Please Input Only Uppercase Letter");
              return;
            }
            setInput(e.nativeEvent.text.toLocaleUpperCase());
            onInputChange(char, e.nativeEvent.text);
          }}
          caretHidden
        />
        {/* blinking animation */}
        <Animated.View
          style={[
            styles.animatedBlink,
            {
              opacity: fadeAnim,
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.text,
          {
            color: darkMode ? "white" : "black",
          },
        ]}
      >
        {shiftedChar}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
    marginBottom: 10,
  },

  text: {
    fontSize: 20,
    fontFamily: "Jost_600Black",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderRadius: 2,
    width: 22,
    height: 25,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Jost_600Black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  animatedBlink: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 2,
    backgroundColor: "yellow",
  },

  notInRangeDiff: {
    backgroundColor: "#E74C3C", // red
    color: "black",
    borderWidth: 0,
  },
  range10Diff: {
    backgroundColor: "#85C1E9", // blue
    color: "black",
    borderWidth: 0,
  },
  range6Diff: {
    backgroundColor: "#F5B041", // yellow
    color: "black",
    borderWidth: 0,
  },
  range3Diff: {
    backgroundColor: "#2ECC71", // green
    color: "black",
    borderWidth: 0,
  },
});
