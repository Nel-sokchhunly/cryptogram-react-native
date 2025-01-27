import { UnlockedQuoteState } from "@/types/game";
import { UnlockedQuote } from "@/types/qoute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

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

const persistConfig = {
  key: "unlockedQuote",
  storage: AsyncStorage,
};

const unlockedQuoteReducer = persistReducer(
  persistConfig,
  unlockedQuoteSlice.reducer
);

export const unlockedQuoteActions = unlockedQuoteSlice.actions;
// export default unlockedQuoteSlice.reducer;
export default unlockedQuoteReducer;
