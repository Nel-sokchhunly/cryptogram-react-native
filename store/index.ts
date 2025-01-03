import { configureStore } from "@reduxjs/toolkit";
import gameMachineReducer from "./gameSlicer";

const store = configureStore({
  reducer: {
    // Add reducers here
    gameMachine: gameMachineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
