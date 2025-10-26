import { isNightSelector } from "@/shared/store";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useSelector } from "react-redux";

export function NightBg() {
  const isNight = useSelector(isNightSelector);

  if (isNight) {
    return (
      <div className="absolute left-0 top-0 w-full h-full bg-black">
        <div className="absolute left-3 top-3 z-10">
          <div className="tooltip tooltip-right" data-tip="Ночь. Вы слышите только жителей из своей команды">
            <MdDarkMode size={30} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-base-100">
      <div className="absolute left-3 top-3 z-10">
        <div className="tooltip tooltip-right" data-tip="День. Вы слышите всех жителей города">
          <MdLightMode size={30} />
        </div>
      </div>
    </div>
  );
}