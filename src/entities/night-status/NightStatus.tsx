import { isNightSelector, titleSelector } from "@/shared/store";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useSelector } from "react-redux";

export function NightBg() {
  const isNight = useSelector(isNightSelector);
  const title = useSelector(titleSelector);

  if (isNight) {
    return (
      <>
        <div className="absolute left-0 top-0 w-full h-full bg-black">
        </div>
        <div className="z-10 relative p-3 w-max mx-auto flex flex-row items-center justify-center gap-2">
          <MdDarkMode size={30} />
          Ночь{title ? '. ' + title : ''}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full bg-base-100">
      </div>
      <div className="z-10 relative p-3 w-max mx-auto flex flex-row items-center justify-center gap-2">
        <MdLightMode size={30} />
        День{title ? '. ' + title : ''}
      </div>
    </>
  );
}