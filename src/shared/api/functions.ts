import axios from "axios";
import type { OpenGame } from "./types";
import { faker } from '@faker-js/faker';

export const getGameState = async (gameId: number) => (
  axios.get(`/api/games/${gameId}`)
      .then((res) => res.data)
      .catch(() => {})
);

export const getProducers = (peerId: string) => (
  axios.get('/webrtc/peers/' + peerId)
    .then((res) => res.data as string[])
    .catch(() => [] as string[])
);

export const getOpenGames = async (): Promise<OpenGame[]> => new Array(Math.random() * 10 + 5 >> 0).fill(null).map(() => {
  const maxGamers = Math.random() * 22 + 8 >> 0; 

  return ({
    id: Math.random() * 1000 >> 0,
    title: faker.book.title(),
    maxGamers,
    start: Math.random() < 0.3 ? faker.date.between({ from: Date.now(), to: '2026-01-31T00:00:00.000Z' }).toISOString() : null,
    master: {
      id: Math.random() * 1000 >> 0,
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
    gamersNames: new Array(Math.random() * (maxGamers - 1) >> 0).fill(null).map(() => faker.internet.username()),
  } as OpenGame);
});

export const getCurrentGames = async () => [
  {
    id: Math.random() * 1000 >> 0,
    title: faker.book.title(),
    status: ['noready', 'started', 'closed'][Math.random() * 3 >> 0],
    master: {
      id: Math.random() * 1000 >> 0,
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
  },
  {
    id: Math.random() * 1000 >> 0,
    title: faker.book.title(),
    status: ['noready', 'started', 'closed'][Math.random() * 3 >> 0],
    master: {
      id: Math.random() * 1000 >> 0,
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
  },
]