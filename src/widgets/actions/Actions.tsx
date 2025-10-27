import { JoinGame } from "@/features/join-game";
import { Night } from "./buttons/night/Night";
import { Recruipmenting } from "./buttons/recruipmenting/Recruipmenting";
import { Speaker } from "./buttons/speaker/Speaker";
import { isJoinedSelector, isMasterSelector, isNightSelector, isRecruipmentingSelector } from "@/shared/store";
import { useSelector } from "react-redux";
import { FreeSpeech } from "./buttons/free-speech/FreeSpeech";
import { Dead } from "./buttons/dead/Dead";

export function Actions() {
  const joined = useSelector(isJoinedSelector);
  const isMaster = useSelector(isMasterSelector);
  const isNight = useSelector(isNightSelector);
  const isRecruipmenting = useSelector(isRecruipmentingSelector);

  if (isRecruipmenting && !joined) {
    return <JoinGame />;
  }

  if (isRecruipmenting && isMaster) {
    return <Recruipmenting />;
  }

  if (isRecruipmenting) {
    return <></>;
  }

  if (isMaster) {
    return (
      <>
        <Night />
        {!isNight && (
          <>
            <Speaker />
            <FreeSpeech />
            <Dead />
          </>
        )}
      </>
    );
  }

  return (
    <>
    </>
  );
}