import { createSlice } from "@reduxjs/toolkit";

export const toolsSlice = createSlice({
  name: 'tools',
  initialState: {
    opennedPeerId: null as number,
  },
  reducers: {
    openPeer(state, { payload }: { payload: number }) {
      state.opennedPeerId = payload;
    },
    closePeer(state) {
      state.opennedPeerId = null;
    }
  },
});

export const { openPeer, closePeer } = toolsSlice.actions;