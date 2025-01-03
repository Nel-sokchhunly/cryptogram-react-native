import { View, Text, StyleSheet } from "react-native";
import { useCallback, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import TitleText from "../common/TitleText";
import BodyText from "../common/BodyText";

export default function GameHelp() {
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
        <QuestionMarkCircleIcon size={28} color="white" />
      </TouchableOpacity>

      {/* modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={styles.bottomSheetContainer}
        onDismiss={handleDismissModalPress}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TitleText
            style={{
              fontFamily: "Jost_700Bold",
              fontSize: 24,
              color: "black",
            }}
          >
            How to play
          </TitleText>
          <BodyText
            style={{
              fontFamily: "Jost_400Regular",
              fontSize: 18,
              color: "black",
            }}
          >
            Decipher the quote by using Cryptogram mechanics.
            {"\n\n"} - The characters are shifted by X amount.
            {"\n"} - X is a random number between -10 to 10 except 0.
            {"\n"} - Example: X = 2, A -&gt; C, B -&gt; D, etc.
            {"\n"} - Example: X = -3, D -&gt; A, E -&gt; B, etc.
            {"\n"}
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
});
