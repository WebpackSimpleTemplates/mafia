import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const select = (s: RootState) => s.game;
const store = (s: RootState) => s;

export const gameIsExistsSelector = createDraftSafeSelector(select, (g) => !!g.gamers);
export const gameIsEmptySelector = createDraftSafeSelector(select, (g) => g.gamers?.length === 0);
export const gamersIdsSelector = createDraftSafeSelector(select, (g) => g.gamers.map((g) => g.id));
export const isNightSelector = createDraftSafeSelector(select, (g) => g.isNight);
export const titleSelector = createDraftSafeSelector(select, (g) => g.title);
export const isJoinedSelector = createDraftSafeSelector(store, (s) => s.game.gamers.some((g) => g.id === (s.auth.id)));
export const winnerSelector = createDraftSafeSelector(select, (g) => g.winner);

export const gamerSelector = (id: number) => (s: RootState) => s.game.gamers.find((g) => g.id === id);