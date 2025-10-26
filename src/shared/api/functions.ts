import axios from "axios";
import type { User } from "./types";

export const getGamers = (gameId: number): Promise<User[]> => (
  axios.get(`/api/games/${gameId}/gamers`)
      .then((res) => res.data)
      .catch(() => null)
)

export const getGameState = async (gameId: number) => (
  axios.get(`/api/games/${gameId}`)
      .then((res) => res.data)
      .catch(() => null)
)