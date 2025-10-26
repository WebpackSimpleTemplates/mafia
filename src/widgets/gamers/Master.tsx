import { gamerSelector, masterIdSelector, userIdSelector } from "@/shared/store"
import { useSelector } from "react-redux"

export function Master() {
  const masterId = useSelector(masterIdSelector);
  const userId = useSelector(userIdSelector);
  const gamer = useSelector(gamerSelector(masterId));

  return (
    <div className="card bg-base-200 flex items-center transition-all justify-center relative text-xs w-[640px] h-[360px]">
      <img
        src={gamer.avatar}
        className="h-40 w-40 rounded-full object-center object-cover"
      />
      <div className="absolute right-2 top-2">
        {userId === masterId && <>Вы</>}
        {userId !== masterId && gamer.username}
      </div>
      <div className="absolute left-2 top-2 text-yellow-500">
        Ведущий
      </div>
    </div>
  )
}