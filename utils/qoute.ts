import { isCharAlphabet, isCharWhitespace } from "./regex";

export function identifyCharType(
  char: string
): "alphabet" | "space" | "symbol" {
  if (isCharAlphabet(char)) {
    return "alphabet";
  } else if (isCharWhitespace(char)) {
    return "space";
  } else {
    return "symbol";
  }
}

export function trimSymbolAtEnd(text: string): string {
  return text.replace(/[^a-zA-Z\s]+$/, "");
}
