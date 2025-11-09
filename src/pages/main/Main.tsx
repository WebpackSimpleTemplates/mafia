import { CreateGame } from "./CreateGame";
import { History } from "./History";
import { OpenGames } from "./OpenGames";

export function Main() {
  return (
    <div className="container mx-auto mt-6 flex flex-row items-start gap-6">
      <div className="w-lg h-max">
        <div className="card p-3 bg-base-100">
          <div className="text-xl font-semibold mb-1">
            Новая игра
          </div>
          <CreateGame />
        <div className="text-xs text-gray-500 mt-2">
          Создав игру Вы сразу станете её ведущим
        </div>
        </div>
        <div className="card bg-base-100 p-3 mt-6">
          <div className="text-xl font-semibold mb-1">
            Ваши игры
          </div>
          <History />
        </div>
      </div>
      <div className="w-full flex-1 h-max card p-3 bg-base-100">
        <OpenGames />
      </div>
    </div>
  );
}