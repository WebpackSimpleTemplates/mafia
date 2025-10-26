import { isRecruipmentingSelector, useGameAction } from "@/shared/store";
import axios from "axios";
import { useSelector } from "react-redux";

export function Recruipmenting() {
  const isRecruipmenting = useSelector(isRecruipmentingSelector);
  const [pending, startTransition] = useGameAction();

  if (!isRecruipmenting) {
    return <></>;
  }

  return (
    <div className="tooltip" data-tip="Раздать участникам случайные роли и начать игру">
      <button
        className="btn btn-lg btn-primary"
        disabled={pending}
        onClick={() => startTransition(async (gameId) => {
          await axios.post(`/api/games/${gameId}/start`);
        })}
      >
        {pending ? <span className="loading loading-dots" /> : 'Начать игру'}
      </button>
    </div>
  );
}