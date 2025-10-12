import { closePeer, opennedPeerSelector, type AppDispatch } from "@/shared/store";
import { BiSolidBinoculars } from "react-icons/bi";
import { BsArrowThroughHeartFill } from "react-icons/bs";
import { FaArrowLeft, FaGlassMartiniAlt } from "react-icons/fa";
import { FaExplosion, FaHeartCrack } from "react-icons/fa6";
import { PiKnifeFill } from "react-icons/pi";
import { TbJewishStarFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export function Peer() {
  const peer = useSelector(opennedPeerSelector);
  const dispatch: AppDispatch = useDispatch();
  
  if (!peer) {
    return <></>;
  }

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-base-300 overflow-hidden flex flex-col">
      <div className="flex flex-row items-center justify-start gap-4 p-4">
        <button onClick={() => dispatch(closePeer())} className="btn btn-sm btn-square btn-ghost">
          <FaArrowLeft size={25} />
        </button>
        <div className="font-bold">
          {peer.name}
        </div>
      </div>
      <div className="flex-1 h-full w-full overflow-auto p-4 pt-0">
        <div className="flex justify-center items-center w-full h-[250px]">
          <img
            src={peer.avatar}
            className="w-35 h-35 object-center object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button className="btn btn-xl btn-primary">
            <PiKnifeFill />
            Убить
          </button>
          <button className="btn btn-xl btn-success">
            <FaHeartCrack />
            Вылечить
          </button>
          <button className="btn btn-xl bg-blue-500">
            <TbJewishStarFilled />
            Проверить
          </button>
          <button className="btn btn-xl bg-purple-400">
            <FaGlassMartiniAlt />
            Напоить
          </button>
          <button className="btn btn-xl bg-pink-500">
            <BsArrowThroughHeartFill />
            Развлечь
          </button>
          <button className="btn btn-xl bg-orange-500">
            <FaExplosion />
            Взорвать
          </button>
          <button className="btn btn-xl bg-cyan-500">
            <BiSolidBinoculars />
            Проверить
          </button>
          <button className="btn btn-xl btn-primary">
            <PiKnifeFill />
            Голосовать
          </button>
          <button className="btn btn-xl btn-accent">
            Голосовать
          </button>
          <button className="btn btn-xl btn-accent">
            Выставить
          </button>
        </div>
      </div>
    </div>
  );
}