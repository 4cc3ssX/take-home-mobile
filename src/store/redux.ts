import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./features/card";
import { rememberEnhancer, rememberReducer } from "redux-remember";
import { reduxStorage } from "@/helpers/storage";

const reducers = {
  card: cardSlice.reducer,
};

const rememberedKeys = ["card"];

const reducer = rememberReducer(reducers);

export const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(reduxStorage, rememberedKeys)
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
