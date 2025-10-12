import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./slices/game.slice";
import { toolsSlice } from "./slices/tools.slice";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    tools: toolsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
