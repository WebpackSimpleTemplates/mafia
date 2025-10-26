import { isRecruipmentingSelector, useGameAction } from "@/shared/store";
import axios from "axios";
import { useSelector } from "react-redux";

export function JoinGame({ className }: { className?: string }) {
  const isRecruipmenting = useSelector(isRecruipmentingSelector);
  const [pending, startTransition] = useGameAction();

  if (!isRecruipmenting) {
    return <></>;
  }

  return (
    <button
      className={"btn btn-primary" + (className ? ' ' + className : '')}
      disabled={pending}
      onClick={() => startTransition(async (gameId) => {
        await axios.post(`/api/games/${gameId}/join`);
      })}
    >
      {pending ? <span className="loading loading-dots" /> : 'Присоединиться'}
    </button>
  );
}