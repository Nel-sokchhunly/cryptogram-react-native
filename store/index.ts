import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";

import gameMachineReducer from "./reducers/gameSlicer";
import unlockedQuoteReducer from "./reducers/unlockedQuoteSlicer";
import storage from "@/service/storage";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["unlockedQuote"],
};

// Combine reducer
const rootReducer = combineReducers({
  unlockedQuotes: unlockedQuoteReducer, // To persist
  gameMachine: gameMachineReducer, // Not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these actions for serializability checks
        ignoredPaths: ["persist"], // Optionally, ignore specific paths in the state
      },
    }),
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
