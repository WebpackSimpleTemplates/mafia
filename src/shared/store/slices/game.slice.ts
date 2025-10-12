import { createSlice } from "@reduxjs/toolkit";
import type { Peer } from "../types";
import { faker } from "@faker-js/faker";

const peersSource = new Array(30).fill(null).map((_, id) => ({
  id,
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
}));

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    peers: peersSource as Peer[],
  },
  reducers: {},
});

export const {} = gameSlice.actions;