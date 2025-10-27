import { gamerSelector, isFreeSpeechSelector, userIdSelector, type AppDispatch, speakerIdSelector, setSpeaker, silence, masterIdSelector } from "@/shared/store"
import { isToSpeakerSelector } from "@/shared/store/selectors/tools.selectors";
import axios from "axios";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";

export function Gamer({ id, className, bigAvatar, withoutActions }: { id: number, className: string, bigAvatar?: boolean, withoutActions?: boolean }) {
  const { gameId } = useParams();
  const masterId = useSelector(masterIdSelector);
  const gamer = useSelector(gamerSelector(id));
  const userId = useSelector(userIdSelector);
  const isFreeSpeech = useSelector(isFreeSpeechSelector);
  const speackerId = useSelector(speakerIdSelector);
  const dispatch: AppDispatch = useDispatch();
  const isToSpeaker = useSelector(isToSpeakerSelector);

  const isMaster = masterId === gamer.id;

  return (
    <div 
      className={
        "card bg-base-200 flex items-center transition-all justify-center relative text-xs "
        + className
        + (withoutActions ? '' : ' cursor-pointer hover:opacity-85')
      }
      onClick={() => {
        if (withoutActions) {
          return;
        }

        if (isToSpeaker && speackerId === id) {
          dispatch(silence());
          axios.post(`/api/games/${gameId}/silence`);
        }
        if (isToSpeaker && speackerId !== id) {
          dispatch(setSpeaker(id));
          axios.post(`/api/games/${gameId}/speaker/${id}`);
        }
      }}
    >
      <img
        src={gamer.avatar}
        className={"rounded-full object-center object-cover" + (bigAvatar ? ' h-40 w-40' : ' h-20 w-20')}
      />
      {isMaster && (
        <div className="absolute left-2 top-2 text-yellow-500">
          Ведущий
        </div>
      )}
      <div className="absolute right-2 top-2">
        {userId === id && <>Вы</>}
        {userId !== id && gamer.username}
      </div>
      {(speackerId === id || isFreeSpeech || isMaster) && (
        <div className={"absolute left-2 bottom-2" + (isMaster ? ' text-yellow-500' : '')}>
          <PiMicrophoneStageFill />
        </div>
      )}
    </div>
  )
}