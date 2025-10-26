import { NightBg } from "@/entities/night-status";
import { JoinGame } from "@/features/join-game";
import { statusSelector } from "@/shared/store";
import { Actions } from "@/widgets/actions";
import { Gamers } from "@/widgets/gamers";
import { Hint } from "@/widgets/hist";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export function Game() {
  const status = useSelector(statusSelector);

  if (status === 'not-found') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        Город не найден
        <Link to="/" className="btn">
          На главную
        </Link>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        Город пуст
        <JoinGame />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-auto">
      <NightBg />
      <Gamers />
      <div className="absolute bottom-0 right-0 w-full flex flex-col items-center gap-2 mb-4 justify-center">
        <Hint />
        <div className="w-max mx-auto flex flex-row items-center gap-2">
          <Actions />
        </div>
      </div>
    </div>
  );
}