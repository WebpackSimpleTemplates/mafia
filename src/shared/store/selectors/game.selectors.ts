import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const select = (s: RootState) => s.game;
const store = (s: RootState) => s;

export const statusSelector = createDraftSafeSelector(select, (g) => {
  if (!g.gamers) {
    return 'not-found' as const;
  }

  if (!g.gamers.length) {
    return 'empty' as const;
  }

  return 'game';
})
export const gamersSelector = createDraftSafeSelector(select, (g) => g.gamers);
export const gamersIdsSelector = createDraftSafeSelector(select, (g) => g.gamers.map((g) => g.id));
export const isRecruipmentingSelector = createDraftSafeSelector(select, (g) => g.isRecruipmenting);
export const isFreeSpeechSelector = createDraftSafeSelector(select, (g) => g.isFreeSpeech);
export const accentIdSelector = createDraftSafeSelector(select, (g) => g.accentId);
export const speakerIdSelector = createDraftSafeSelector(select, (g) => g.speakerId);
export const isNightSelector = createDraftSafeSelector(select, (g) => g.isNight);
export const masterIdSelector = createDraftSafeSelector(select, (g) => g.masterId);
export const isJoinedSelector = createDraftSafeSelector(store, (s) => s.game.gamers.some((g) => g.id === (s.auth.id)));
export const isMasterSelector = createDraftSafeSelector(store, (s) => s.auth.id === s.game.masterId)

export const gamerSelector = (id: number) => (s: RootState) => s.game.gamers.find((g) => g.id === id);