// game state machine
import { getRandomQuote } from "@/service/dataset";
import { identifyCharType } from "@/utils/qoute";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlphabetCheckItem, AlphabetCheckSet, GameState } from "@/types/game";
import { toast } from "@backpackapp-io/react-native-toast";

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
            // inputValue: "",
            inputValue: char,
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
      const newMap = JSON.parse(
        JSON.stringify(state.alphaInput)
      ) as AlphabetCheckSet;

      for (const key in newMap) {
        const char = newMap[key];
        if (char) {
          const guessDiff = char.inputValue
            ? Math.abs(char.inputValue.charCodeAt(0) - key.charCodeAt(0))
            : undefined;

          newMap[key].showCheck = true;
          newMap[key].guessDiff = guessDiff;
        }
      }
      state.alphaInput = newMap;

      // form the answer string
      const answer = state.quoteChars
        .map((char) => {
          if (identifyCharType(char) === "alphabet") {
            return newMap[char].inputValue;
          }
          return char;
        })
        .join("");

      if (answer === state.quote!.quote) {
        // correct answer
        toast("Correct!");
      }
    },

    onAlphaInputFocus: (state, payload: PayloadAction<string>) => {
      const newMap = JSON.parse(
        JSON.stringify(state.alphaInput)
      ) as AlphabetCheckSet;
      const char = payload.payload;

      newMap[char].isFocused = true;

      state.alphaInput = newMap;
    },
    onAlphaInputBlur: (state, payload: PayloadAction<string>) => {
      const newMap = JSON.parse(
        JSON.stringify(state.alphaInput)
      ) as AlphabetCheckSet;
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
      const newMap = JSON.parse(
        JSON.stringify(state.alphaInput)
      ) as AlphabetCheckSet;
      const input = payload.payload.input;
      const char = payload.payload.char;

      const currentChar = newMap[char];

      newMap[char] = {
        ...currentChar,
        inputValue: input,
        showCheck: false,
      } satisfies AlphabetCheckItem;

      state.alphaInput = newMap;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
