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
  const dispatch: AppDispatch = useDispatch();
  const isNight = useSelector(isNightSelector);

  if (active) {
    return (
      <div className="tooltip" data-tip="Закончить интервью">
        <button
          className="btn btn-lg btn-square btn-primary"
          onClick={() => {
            dispatch(disableAllActions());
            dispatch(silence());
            axios.post(`/api/games/${gameId}/silence`);
          }}
        >
          <CgClose size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="tooltip" data-tip="Начать интервью">
      <button
        disabled={isNight}
        className="btn btn-lg btn-square"
        onClick={() => {
          dispatch(enableToSpeaker());
          axios.post(`/api/games/${gameId}/silence`);
        }}
      >
        <PiMicrophoneStageFill />
      </button>
    </div>
  );
}