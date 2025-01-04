import { View, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import { useCallback, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import TitleText from "../common/TitleText";
import BodyText from "../common/BodyText";
import SubHeaderText from "../common/SubHeader";
import CharText from "../quote/CharText";

const Example = {
  chars: [
    {
      char: "W",
      input: "G", // Random character within full alphabet range
      guessDiff: 14, // 'W' -> 'G' is a shift of 14 positions backward
    },
    {
      char: "O",
      input: "Y", // Random character within 10 range of 'O' but not lower than 7
      guessDiff: 10, // 'O' -> 'Y' is a shift of 10 positions forward
    },
    {
      char: "R",
      input: "X", // Random character within 6 range of 'R'
      guessDiff: 6, // 'R' -> 'X' is a shift of 6 positions forward
    },
    {
      char: "D",
      input: "F", // Random character within 3 range of 'D'
      guessDiff: 2, // 'D' -> 'F' is a shift of 2 positions forward
    },
  ],
  shiftAmount: 2,
};

export default function GameHelpBottomSheet({
  children,
}: {
  children: TouchableOpacityProps["children"];
}) {
  const [modalState, setModalState] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setModalState(true);
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setModalState(false);
  }, []);

  return (
    <View>
      {/* toggle help modal */}
      <TouchableOpacity
        onPress={() =>
          modalState ? handleDismissModalPress() : handlePresentModalPress()
        }
      >
        {children}
      </TouchableOpacity>

      {/* modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={styles.bottomSheetContainer}
        onDismiss={handleDismissModalPress}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TitleText style={styles.titleText}>How to play</TitleText>
          <BodyText style={styles.bodyText}>
            Decipher the quote by using Cryptogram mechanics.
            {"\n\n"} - The characters are shifted by X amount.
            {"\n"} - X is a random number between -10 to 10 except 0.
            {"\n"} - Example: X = 2, A -&gt; C, B -&gt; D, etc.
            {"\n"} - Example: X = -3, D -&gt; A, E -&gt; B, etc.
            {"\n"}
          </BodyText>
          <SubHeaderText style={styles.subHeaderText}>Hint Check</SubHeaderText>
          <BodyText style={styles.bodyText}>
            When click on the Check button, the hints will be show to you as a
            feedback.
          </BodyText>
          <View style={styles.exampleContainer}>
            <View style={styles.example}>
              <Text style={styles.boldText}>Guess:</Text>
            </View>
            <View style={styles.example}>
              <Text style={styles.boldText}>Correct Word:</Text>
            </View>
            {/* wrong guess */}
            <View style={styles.example}>
              {Example.chars.map((item, index) => (
                <CharText
                  key={index}
                  char={item.char}
                  inputValue={item.input || null}
                  shiftAmount={Example.shiftAmount}
                  guessDiff={item.guessDiff}
                  showCheck={true}
                  onInputChange={(char, input) => {}}
                  darkMode={false}
                />
              ))}
            </View>
            {/* correct guess */}
            <View style={styles.example}>
              {Example.chars.map((item, index) => (
                <CharText
                  key={index}
                  char={item.char}
                  inputValue={item.char || null}
                  shiftAmount={Example.shiftAmount}
                  guessDiff={0}
                  showCheck={true}
                  onInputChange={(char, input) => {}}
                  darkMode={false}
                />
              ))}
            </View>
          </View>
          <BodyText style={styles.bodyText}>
            - RED: Incorrect letter correct letter
            {"\n"}- BLUE: Within 10 range of correct letter
            {"\n"}- YELLOW: Within 6 range of correct letter
            {"\n"}- GREEN: Within 3 range of correct letter
          </BodyText>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {},
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "flex-start",
    color: "black",
  },
  titleText: {
    fontFamily: "Jost_700Bold",
    fontSize: 24,
    color: "black",
  },
  subHeaderText: {
    fontFamily: "Jost_700Bold",
    fontSize: 20,
    color: "black",
  },
  bodyText: {
    fontFamily: "Jost_400Regular",
    fontSize: 18,
    color: "black",
  },
  boldText: {
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
    color: "black",
  },
  exampleContainer: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  example: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
  },
});
