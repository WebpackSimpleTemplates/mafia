import { gamerSelector, userIdSelector } from "@/shared/store";
import { useSelector } from "react-redux"
import { useTransport } from "./media/useTransport";
import { useMediaTags } from "./media/useMediaTags";
import { useParams } from "react-router";
import { Video } from "./components/Video";
import { Audio } from "./components/Audio";
import { BiMicrophoneOff } from "react-icons/bi";

export function Gamer({ id, className, bigAvatar }: { id: number, className: string, bigAvatar?: boolean }) {
  const gamer = useSelector(gamerSelector(id));
  const { gameId } = useParams();
  const userId = useSelector(userIdSelector);

  const peerId = gameId + '_' + gamer.id;
  const subscriberId = peerId + '_' + userId;

  const createConsumer = useTransport(subscriberId);

  const mediaTags = useMediaTags(peerId, subscriberId);

  return (
    <div 
      className={
        "card bg-base-200 flex items-center transition-all justify-center relative overflow-hidden "
        + className
      }
    >
      {mediaTags.includes('cam-audio') && userId !== id && (
        <Audio createConsumer={createConsumer} peerId={peerId} tag="cam-audio" />
      )}
      {!mediaTags.includes('cam-audio') && (
        <div className="absolute left-0 bottom-0 h-4 w-4 rounded-sm bg-black/70 text-xs flex justify-center items-center text-error">
          <BiMicrophoneOff/>
        </div> 
      )}
      <div className="absolute right-0 top-0 px-2 py-1 rounded-sm bg-black/70 text-xs">
        {userId === id && <>Вы</>}
        {userId !== id && gamer.username}
      </div>
      {!mediaTags.includes("cam-video") && (
        <img
          src={gamer.avatar}
          className={"rounded-full object-center object-cover" + (bigAvatar ? ' h-40 w-40' : ' h-18 w-18')}
        />
      )}
      {mediaTags.includes("cam-video") && (
        <Video
          createConsumer={createConsumer}
          peerId={peerId}
          tag="cam-video"
          className="w-full h-full object-cover object-center"
        />
      )}
    </div>
  )
}