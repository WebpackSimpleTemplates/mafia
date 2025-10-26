import { useTransition } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { useParams } from "react-router";
import axios from "axios";
import { setGame } from "../slices/game.slice";
import { disableAllActions } from "../slices/tools.slice";

export function useGameAction() {
  const { gameId } = useParams();
  const [pending, startTransition] = useTransition();
  const dispatch: AppDispatch = useDispatch();

  return [
    pending,
    (fn: (gameId: number) => void | Promise<void>) => startTransition(async () => {
      await fn(+gameId);

      const state = await axios.get(`/api/games/${gameId}`)
        .then((res) => res.data)
        .catch(() => null);

      dispatch(setGame(state));
    })
  ] as const;
}