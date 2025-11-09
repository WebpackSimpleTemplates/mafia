import type { Producer } from "mediasoup-client/types";
import { useRef, useState } from "react";
import type { ProducerCreator } from "./useTransport";
import { toast } from 'react-toastify';
import type { DeviceControl } from "./types";

export function useMicro(createProducer: ProducerCreator): DeviceControl {
  const [active, setActive] = useState(false);

  const streamRef = useRef<MediaStream>(null);
  const producerRef = useRef<Producer>(null);

  function takeOff() {
    setActive(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null
    }

    if (producerRef.current) {
      producerRef.current.close();
      producerRef.current = null;
    }
  }

  return {
    active,
    takeOff,
    async takeOn() {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.log(error);
        toast.error('Не удалось подключиться к микрофону. Убедитесь, что Вы предоставили доступ и не используете микрофон в других приложениях', { position: 'top-left' }); 
        return;
      }

      const track = streamRef.current.getAudioTracks()[0];

      track.addEventListener('ended', () => {
        if (streamRef.current) {
          toast.warning('Доступ к микрофону закрыт. Убедитесь, что он подключен к компьютеру и Вы предоставили к нему доступ.', { position: 'top-left' }); 
        }

        takeOff();
      });

      setActive(true);

      producerRef.current = await createProducer('cam-audio', track, takeOff);
    },
  }
}