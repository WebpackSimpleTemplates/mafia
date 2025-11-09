import { getOpenGames } from "@/shared/api";
import { useQuery } from "@/shared/hooks/useQuery";
import { useState } from "react";
import dayjs from 'dayjs';
import { FaSearch } from "react-icons/fa";

export function OpenGames() {
  const init = useQuery('open-games', getOpenGames);

  const [list, setList] = useState(init);

  return (
    <>
      <div className="flex flex-row mb-2 items-start gap-2">
        <label className="input w-full">
          <FaSearch />
          <input
            className="grow"
            placeholder="Поиск"
          />
        </label>
        <select className="select w-50">
          <option>Все игры</option>
          <option>Набор сейчас</option>
          <option>Запланированные</option>
        </select>
      </div>
      {list.map((item) => (
        <div key={item.id} className="card p-3 border border-gray-500 mt-2">
          <div className="flex flex-row items-center justify-start mb-3">
            <div className="flex flex-row justify-start flex-1">
              {item.gamersNames.length} / {item.maxGamers}
              <div className="font-semibold mx-4">
                {item.title}
              </div>
            </div>
            {item.start && (
              <div className="text-xs">
                Начало:{' '}
                {dayjs(item.start).format('YY-MM-DD') !== dayjs().format('YY-MM-DD') && dayjs(item.start).format('DD.MM') + ' в '}
                {dayjs(item.start).format('HH:mm')}
              </div>
            )}
            <div className="flex flex-row justify-end flex-1">
              {item.master.username}
              <img
                src={item.master.avatar}
                className="w-6 h-6 rounded-full object-center object-cover ml-2"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {item.gamersNames.map((name) => name).join(', ')}
          </div>
        </div>
      ))}
    </>
  );
}