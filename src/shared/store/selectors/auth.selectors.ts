import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const select = (s: RootState) => s.auth;

export const userSelector = createDraftSafeSelector(select, (a) => ({ ...a }));
export const userIdSelector = createDraftSafeSelector(select, (a) => a.id);