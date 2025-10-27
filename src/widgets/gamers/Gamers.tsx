import { Gamer } from "./Gamer";
import { accentIdSelector, gamersIdsSelector, isNightSelector, masterIdSelector } from "@/shared/store";
import { useSelector } from "react-redux";

function BigWindow() {
  const accentId = useSelector(accentIdSelector);
  const isNight = useSelector(isNightSelector);

  return (
    <div className={"w-[640px] mx-auto transition-all overflow-hidden" + ((!isNight && accentId) ? ' h-[360px] mb-3' : ' h-0 mb-0')}>
      {!!accentId && <Gamer bigAvatar id={accentId} className="w-[640px] h-[360px]" withoutActions />}
    </div>
  );
}

export function Gamers() {
  const gamers = useSelector(gamersIdsSelector);
  const masterId = useSelector(masterIdSelector);

  return (
    <div className="p-7 h-full w-full overflow-auto">
      <BigWindow />
      <div className="w-full mx-auto h-max flex flex-row flex-wrap items-start justify-center gap-3 overflow-auto">
        <Gamer id={masterId} withoutActions className="w-[240px] h-[135px]" />
        {gamers.filter((id) => id !== masterId).map((id) => <Gamer className="w-[240px] h-[135px]" id={id} key={id} />)}
      </div>
    </div>
  );
}