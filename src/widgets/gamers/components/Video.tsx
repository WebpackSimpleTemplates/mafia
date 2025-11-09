import React, { useEffect, useRef } from "react";
import type { ConsumerCreator } from "../media/useTransport";
import type { Consumer } from "mediasoup-client/types";

export function Video({ createConsumer, peerId, tag, ...props }: { createConsumer: ConsumerCreator, peerId: string, tag: string } & Omit<React.ComponentProps<'video'>, 'src' | 'ref' | 'autoPlay' | 'playsInline' | 'loop'>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let flush = false;
    let consumer: Consumer;

    (async () => {
      try {
        consumer = await createConsumer(peerId, tag);

        if (!flush) {
          ref.current.srcObject = new MediaStream([consumer.track]);
        } 
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      flush = true;
      try {
        consumer?.close();
      } catch (error) {}
    }
  }, [peerId, tag]);

  return (
    <video
      {...props}
      playsInline
      autoPlay
      ref={ref}
      muted
    />
  )
}
