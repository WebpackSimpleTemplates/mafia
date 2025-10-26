import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toSpeaker: false,
  toAccent: false,
}

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    enableToSpeaker() {
      return {
        ...initialState,
        toSpeaker: true,
      }
    },
    enableToAccent() {
      return {
        ...initialState,
        toAccent: true,
      }
    },
    disableAllActions() {
      return initialState;
    },
  },
});

export const { enableToSpeaker, enableToAccent, disableAllActions } = toolsSlice.actions;