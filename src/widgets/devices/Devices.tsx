import { useTransport } from "./media/useTransport";
import { useMicro } from "./media/useMicro";
import { useCam } from "./media/useCam";
import { useEffect, useTransition, type ReactNode } from "react";
import type { DeviceControl } from "./media/types";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { userIdSelector } from "@/shared/store";
import { BiSolidMicrophone, BiSolidMicrophoneOff, BiSolidVideo, BiSolidVideoOff } from "react-icons/bi";

function Btn({ children, device }: { children: ReactNode, device: DeviceControl }) {
  const [pending, startTransition] = useTransition();

  if (pending) {
    return (
      <button className="btn btn-ghost btn-square text-info">
        <span className="loading loading-spinner" />
      </button>
    );
  }

  return (
    <button
      className={
        "btn btn-ghost btn-square"
        + (device.active ? ' text-success' : ' text-error')
      }
      onClick={() => {
        if (device.active) {
          device.takeOff();
        } else {
          startTransition(device.takeOn);
        }
      }}
    >
      {children}
    </button>
  );
}

export function Devices() {
  const { gameId } = useParams();
  const userId = useSelector(userIdSelector);
  const peerId = gameId + '_' + userId;

  const createProducer = useTransport(peerId);

  const micro = useMicro(createProducer);
  const cam = useCam(createProducer);

  useEffect(() => {
    (async () => {
      await axios.post(`/webrtc/peers/${peerId}/disconnect`).catch(() => {});
      window.addEventListener('beforeunload', () => axios.post(`/webrtc/peers/${peerId}/disconnect`).catch(() => {}));

      cam.takeOn();
      micro.takeOn();
    })();
  }, []);

  return (
    <div className="flex flex-row items-center gap-2">
      <Btn device={cam}>
        {cam.active ? <BiSolidVideo /> : <BiSolidVideoOff />}
      </Btn>
      <Btn device={micro}>
        {micro.active ? <BiSolidMicrophone /> : <BiSolidMicrophoneOff />}
      </Btn>
    </div>
  );
}