import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";

export type GameState = {
  id: number,
  gamers: User[],
  masterId: number,
  isRecruipmenting: boolean,
  isNight: boolean,
  speakerId: number,
  accentId: number,
  isFreeSpeech: boolean,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {} as GameState,
  reducers: {
    setGame(_, { payload }: { payload: GameState }) {
      return payload || {} as GameState;
    },
    setAccent(state, { payload }: { payload: number }) {
      state.accentId = payload;
    },
    setSpeaker(state, { payload }: { payload: number }) {
      state.speakerId = payload;
      state.accentId = payload;
      state.isFreeSpeech = false;
    },
    silence(state) {
      state.accentId = null;
      state.speakerId = null;
      state.isFreeSpeech = false;
    },
    freeSpeech(state) {
      state.accentId = null;
      state.speakerId = null;
      state.isFreeSpeech = true;
    }
  },
});

export const { setGame, setAccent, setSpeaker, silence, freeSpeech } = gameSlice.actions;