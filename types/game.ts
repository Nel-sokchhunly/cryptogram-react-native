import { Quote } from "./qoute";

export type AlphabetCheckItem = {
  inputValue: string;
  guessDiff: number | undefined;
  showCheck: boolean;
  isFocused: boolean;
};

export interface AlphabetCheckSet {
  [key: string]: AlphabetCheckItem;
}

export interface GameState {
  quote: Quote | null;
  quoteChars: string[]; // the characters of the quote
  alphaInput: AlphabetCheckSet;
  shiftAmount: number;
  state: "idle" | "playing" | "ended";
  timer: number;
}
