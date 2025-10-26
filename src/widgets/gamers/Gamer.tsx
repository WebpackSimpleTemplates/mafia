import { gamerSelector, isFreeSpeechSelector, userIdSelector, type AppDispatch, speakerIdSelector, setSpeaker, silence, isMasterSelector } from "@/shared/store"
import { isToSpeakerSelector } from "@/shared/store/selectors/tools.selectors";
import axios from "axios";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";

export function Gamer({ id, className, bigAvatar }: { id: number, className: string, bigAvatar?: boolean }) {
  const { gameId } = useParams();
  const gamer = useSelector(gamerSelector(id));
  const userId = useSelector(userIdSelector);
  const isFreeSpeech = useSelector(isFreeSpeechSelector);
  const speackerId = useSelector(speakerIdSelector);
  const dispatch: AppDispatch = useDispatch();
  const isMaster = useSelector(isMasterSelector)

  return (
    <div 
      className={
        "card bg-base-200 flex items-center transition-all justify-center relative text-xs hover:opacity-85 cursor-pointer "
        + className
      }
      onClick={() => {
        if (isMaster && speackerId === id) {
          dispatch(silence());
          axios.post(`/api/games/${gameId}/silence`);
        }
        if (isMaster && speackerId !== id) {
          dispatch(setSpeaker(id));
          axios.post(`/api/games/${gameId}/speaker/${id}`);
        }
      }}
    >
      <img
        src={gamer.avatar}
        className={"rounded-full object-center object-cover" + (bigAvatar ? ' h-40 w-40' : ' h-20 w-20')}
      />
      <div className="absolute right-2 top-2">
        {userId === id && <>Вы</>}
        {userId !== id && gamer.username}
      </div>
      {(speackerId === id || isFreeSpeech) && (
        <div className="absolute left-2 bottom-2">
          <PiMicrophoneStageFill />
        </div>
      )}
    </div>
  )
}