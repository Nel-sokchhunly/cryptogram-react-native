// game state machine
import { getRandomQuote } from "@/service/dataset";
import { identifyCharType } from "@/utils/qoute";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlphabetCheckItem, AlphabetCheckSet, GameState } from "@/types/game";

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
          alphas[char] = {
            inputValue: "",
            guessDiff: undefined,
            showCheck: false,
            isFocused: false,
          };
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

    onAlphaInputFocus: (state, payload: PayloadAction<string>) => {
      const newMap = JSON.parse(JSON.stringify(state.alphaInput));
      const char = payload.payload;
      console.log("onAlphaInputFocus", char);
      console.log(newMap);

      newMap[char].isFocused = true;

      state.alphaInput = newMap;
    },
    onAlphaInputBlur: (state, payload: PayloadAction<string>) => {
      const newMap = JSON.parse(JSON.stringify(state.alphaInput));
      const char = payload.payload;

      newMap[char].isFocused = false;

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

      const currentChar = newMap[char];

      newMap[char] = {
        ...currentChar,
        inputValue: input,
        guessDiff,
        showCheck: false,
      } satisfies AlphabetCheckItem;

      state.alphaInput = newMap;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
