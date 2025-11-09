import { NightBg } from "@/entities/night-status";
import { getGameState } from "@/shared/api";
import { gameIsEmptySelector, gameIsExistsSelector, isJoinedSelector, setGame, winnerSelector, type AppDispatch } from "@/shared/store";
import { Devices } from "@/widgets/devices";
import { Gamers } from "@/widgets/gamers";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import useWebSocket from "react-use-websocket";

export function Game() {
  const { gameId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useWebSocket('/ws/game/' + gameId, {
    async onOpen() {
      dispatch(setGame(await getGameState(+gameId)))
    },
    async onMessage(event) {
      dispatch(setGame(JSON.parse(event.data)));
    }
  })

  const isExist = useSelector(gameIsExistsSelector);
  const isEmpty = useSelector(gameIsEmptySelector);
  const winner = useSelector(winnerSelector);
  const isJoined = useSelector(isJoinedSelector);

  if (!isExist) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        Город не найден
        <Link to="/" className="btn">
          На главную
        </Link>
      </div>
    );
  }

  if (winner === 'civilians') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        Город избавился от всех угроз и теперь живёт мирной жизнью. Победа мирных жителей!
      </div>
    );
  }

  if (winner === 'mafia') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        Мафия убила убила большую часть города, а оставшихся подчинила себе. Победа мафии!
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        В городе ещё никто не поселился
        <button
          className="btn"
          onClick={() => axios.post(`/api/games/${gameId}/join`)}
        >
          Поселится
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col">
      <NightBg />
      <Gamers />
      {isJoined && (
        <div className="absolute left-4 bottom-4 w-max h-max">
          <Devices />
        </div>
      )}
    </div>
  );
}