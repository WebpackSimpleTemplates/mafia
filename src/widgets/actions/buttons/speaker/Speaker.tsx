import { disableAllActions, enableToSpeaker, isNightSelector, silence, speakerIdSelector, type AppDispatch } from "@/shared/store";
import { isToSpeakerSelector } from "@/shared/store/selectors/tools.selectors";
import axios from "axios";
import { CgClose } from "react-icons/cg";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

export function Speaker() {
  const { gameId } = useParams();
  const active = useSelector(isToSpeakerSelector);
  const speackerId = useSelector(speakerIdSelector);
  const dispatch: AppDispatch = useDispatch();
  const isNight = useSelector(isNightSelector);

  if (active || speackerId) {
    return (
      <div className="tooltip" data-tip={speackerId ? "Закончить интервью" : "Отмена"}>
        <button
          className="btn btn-lg btn-square"
          onClick={() => {
            dispatch(silence());
            dispatch(disableAllActions());
            axios.post(`/api/games/${gameId}/silence`);
          }}
        >
          <CgClose size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="tooltip" data-tip="Интервью. Дать слово жителю">
      <button
        disabled={isNight}
        className="btn btn-lg btn-square"
        onClick={() => {
          dispatch(enableToSpeaker());
          dispatch(silence());
          axios.post(`/api/games/${gameId}/silence`);
        }}
      >
        <PiMicrophoneStageFill />
      </button>
    </div>
  );
}