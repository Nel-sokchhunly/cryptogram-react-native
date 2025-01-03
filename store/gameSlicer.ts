// game state machine
import { getRandomQuote } from "@/service/dataset";
import { Quote } from "@/types/qoute";
import { identifyCharType } from "@/utils/qoute";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlphabetCheckSet {
  [key: string]: {
    inputValue: string;
    guessDiff: number | undefined;
    showCheck: boolean;
  } | null;
}

interface GameState {
  quote: Quote | null;
  quoteChars: string[]; // the characters of the quote
  alphaInput: AlphabetCheckSet;
  shiftAmount: number;
}

const gameState: GameState = {
  quote: null,
  quoteChars: [],
  alphaInput: {},
  shiftAmount: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: gameState,
  reducers: {
    startGame: (state) => {
      const quote = getRandomQuote();
      const chars = quote.quote.split("");

      state.quote = quote;
      state.quoteChars = chars;
      state.shiftAmount = Math.floor(Math.random() * 20) - 10; // random from -10 to 10 and not 0

      const alphas = {} as AlphabetCheckSet;
      chars.forEach((char) => {
        if (identifyCharType(char) === "alphabet") {
          alphas[char] = null;
        }
      });
      state.alphaInput = alphas;
    },

    checkAnswer: (state) => {
      // loop through the alphaInput and change the showCheck to true
      const newMap = JSON.parse(JSON.stringify(state.alphaInput));
      for (const key in newMap) {
        if (newMap[key]) {
          newMap[key].showCheck = true;
        }
      }
      state.alphaInput = newMap;
    },

    updateAlphaInput: (
      state,
      payload: PayloadAction<{
        char: string;
        input: string;
      }>
    ) => {
      const newMap = JSON.parse(JSON.stringify(state.alphaInput));
      const input = payload.payload.input;
      const char = payload.payload.char;

      // calculate the difference between the input and the correct answer
      const guessDiff = input
        ? Math.abs(input.charCodeAt(0) - char.charCodeAt(0))
        : undefined;

      newMap[char] = {
        inputValue: input,
        guessDiff,
        showCheck: false,
      };

      state.alphaInput = newMap;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
