import { isCharAlphabet, isCharWhitespace } from "./regex";

/**
 * Identify the type of the character
 * @param char The character to identify
 * @returns The type of the character (alphabet, space, symbol)
 */
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

/**
 * Remove trailing symbols from the text
 * @param text The text to trim
 */
export function trimSymbolAtEnd(text: string): string {
  return text.replace(/[^a-zA-Z\s]+$/, "");
}
