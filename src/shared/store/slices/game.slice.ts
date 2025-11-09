import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";

export type GameState = {
  id: number,
  gamers: User[],
  isNight: boolean,
  winner: string,
  title: string,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {} as GameState,
  reducers: {
    setGame(_, { payload }: { payload: GameState }) {
      return payload || {} as GameState;
    },
  },
});

export const { setGame } = gameSlice.actions;