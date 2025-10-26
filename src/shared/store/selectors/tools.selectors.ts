import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const select = (s: RootState) => s.tools;

export const isToAccentSelector = createDraftSafeSelector(select, (t) => t.toAccent);
export const isToSpeakerSelector = createDraftSafeSelector(select, (t) => t.toSpeaker);