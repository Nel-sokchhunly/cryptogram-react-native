import { UnlockedQuoteState } from "@/types/game";
import { UnlockedQuote } from "@/types/qoute";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const unlockedQuoteState: UnlockedQuoteState = {
  quote: [],
};

const unlockedQuoteSlice = createSlice({
  name: "unlockedQuote",
  initialState: unlockedQuoteState,
  reducers: {
    addQuote: (state, action: PayloadAction<UnlockedQuote>) => {
      state.quote.push(action.payload);
    },
    resetQuotes: (state) => {
      state.quote = [];
    },
  },
});

export const unlockedQuoteActions = unlockedQuoteSlice.actions;
export default unlockedQuoteSlice.reducer;
