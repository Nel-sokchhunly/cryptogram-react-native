import { StyleSheet, Text } from "react-native";

export default function Symbol({ char }: { char: string }) {
  return <Text style={styles.text}>{char}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 28,
    fontFamily: "Jost_600Black",
  },
});
