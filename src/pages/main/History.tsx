import { getCurrentGames } from "@/shared/api";
import { useQuery } from "@/shared/hooks/useQuery";
import { useState } from "react";

export function History() {
  const init = useQuery('user-current-games', () => getCurrentGames());

  const [list] = useState(init);

  return (
    <>
      {list.map((game) => (
        <div key={game.id} className="card p-1 border border-gray-500 mt-2">
          <div className="text-xs flex flex-row items-center">
            <div className="flex-1">
              {game.title}
            </div>
            {game.status === 'noready' && <span className="text-success">Идёт набор...</span>}
            {game.status === 'started' && <span className="text-warning font-bold">Начата</span>}
            {game.status === 'closed' && <span className="text-gray-500">Закончена</span>}
            <div className="flex flex-row items-center flex-1 justify-end">
              {game.master.username}
              <img
                src={game.master.avatar}
                className="w-6 h-6 rounded-full object-center object-cover ml-2"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}