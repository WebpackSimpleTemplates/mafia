import axios from "axios";
import { useParams } from "react-router";

export function JoinGame({ className }: { className?: string }) {
  const { gameId } = useParams();

  return (
    <button
      className={"btn btn-primary" + (className ? ' ' + className : '')}
      onClick={() => axios.post(`/api/games/${gameId}/join`)}
    >
      Присоединиться
    </button>
  );
}