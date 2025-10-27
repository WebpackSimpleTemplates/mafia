import { GrGroup } from "react-icons/gr";
import { disableAllActions, freeSpeech, isFreeSpeechSelector, silence, useGameAction, type AppDispatch } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";
import { useParams } from "react-router";

export function FreeSpeech() {
  const { gameId } = useParams();
  const isFreeSpeech = useSelector(isFreeSpeechSelector);
  const dispatch: AppDispatch = useDispatch();

  if (isFreeSpeech) {
    return (
      <div className="tooltip" data-tip="Закончить обсуждение">
        <button
          className="btn btn-lg btn-square btn-primary"
          onClick={() => {
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
    <div className="tooltip" data-tip="Начать обсуждение">
      <Button
        className="btn btn-lg btn-square"
        onClick={() => {          
          dispatch(disableAllActions());
          dispatch(freeSpeech());
          axios.post(`/api/games/${gameId}/free-speech`);        
        }}
      >
        <GrGroup />
      </Button>
    </div>
  );
}