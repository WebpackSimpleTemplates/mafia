import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const select = (s: RootState) => s.game;

export const peersSelector = createDraftSafeSelector(select, (g) => g.peers);
export const peerSelector = (id: number) => (s: RootState) => s.game.peers.find((p) => p.id === id);

export const opennedPeerSelector = createDraftSafeSelector((s: RootState) => s, (s) => s.tools.opennedPeerId && s.game.peers.find((p) => p.id === s.tools.opennedPeerId));
