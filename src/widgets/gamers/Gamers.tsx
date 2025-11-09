import { Gamer } from "./Gamer";
import { gamersIdsSelector } from "@/shared/store";
import { useSelector } from "react-redux";

export function Gamers() {
  const gamers = useSelector(gamersIdsSelector);

  return (
    <div className="h-full w-full overflow-auto flex-1">
      <div className="container mx-auto h-max flex flex-row flex-wrap items-start justify-center gap-3 overflow-auto">
        {gamers
          .sort((a, b) => a > b ? -1 : 1)
          .map((id) => <Gamer className="w-[240px] h-[135px]" id={id} key={id} />)}
      </div>
    </div>
  );
}