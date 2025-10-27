import { disableAllActions, isNightSelector, useGameAction, type AppDispatch } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import axios from "axios";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export function Night() {
  const isNight = useSelector(isNightSelector);
  const [pending, startTransition] = useGameAction();
  const dispatch: AppDispatch = useDispatch();

  if (isNight) {
    return (
      <div className="tooltip" data-tip="День. Разбудить город">
        <Button
          pending={pending}
          className="btn btn-square btn-lg"
          onClick={() => startTransition(async (gameId) => {
            await axios.post(`/api/games/${gameId}/day`);
          })}
        >
          <MdLightMode size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="tooltip" data-tip="Ночь. Отправить город спать">
      <Button
        pending={pending}
        className="btn btn-square btn-lg"
        onClick={() => startTransition(async (gameId) => {
          dispatch(disableAllActions());
          await axios.post(`/api/games/${gameId}/night`);
        })}
      >
        <MdDarkMode size={20} />
      </Button>
    </div>
  );
}