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
}: {
  char: string;
  inputValue: string | null;
  onInputChange: (char: string, input: string) => void;
  shiftAmount: number;
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

  return (
    <View style={styles.container}>
      <View className="w-fit h-fit relative">
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isFocused ? "yellow" : "white",
            },
          ]}
          // autoFocus
          maxLength={1}
          returnKeyType="next"
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

      <Text style={styles.text}>{shiftedChar}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,

    paddingBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "Jost_600Black",
    textAlign: "center",
  },

  input: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 2,
    color: "white",
    width: 20,
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
});
