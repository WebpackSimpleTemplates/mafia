import { useRef, useState } from "react";
import type { ProducerCreator } from "./useTransport";
import type { Producer } from "mediasoup-client/types";
import type { DeviceControl } from "./types";
import { toast } from 'react-toastify';

export function useCam(createProducer: ProducerCreator): DeviceControl {
  const [active, setActive] = useState(false);

  const producerRef = useRef<Producer>(null);

  function takeOff() {
    setActive(false);

    if (producerRef.current) {
      producerRef.current.close();
      producerRef.current = null;
    }
  }

  return {
    active,
    takeOff,
    async takeOn() {
      let stream: MediaStream
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.log(error);
        toast.error('Не удалось подключиться к камере. Убедитесь, что Вы предоставили доступ и не используете камеру в других приложениях', { position: 'top-left' });
        return;
      }

      const track = stream.getVideoTracks()[0];

      track.addEventListener('ended', () => {
        toast.warning('Доступ к камере закрыт. Убедитесь, что она подключена к компьютеру и Вы предоставили к ней доступ.', { position: 'top-left' });
      });

      setActive(true);

      producerRef.current = await createProducer('cam-video', track, takeOff);
    },
  }
}