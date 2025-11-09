import type { Consumer, RtpCapabilities, Transport } from "mediasoup-client/types";
import { Device } from 'mediasoup-client';
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export type ConsumerCreator = (peerId: string, mediaTag: string, onError?: () => void) => Promise<Consumer>;

type SubscriberTransport = Transport & { rtpCapabilities: RtpCapabilities };

const createTransport = async (subscriberId: string): Promise<SubscriberTransport> => {
  const routerRtpCapabilities = await axios.get('/webrtc/rtp-capabilities').then((res) => res.data);

  const device = new Device();
  await device.load({ routerRtpCapabilities });

  const options = await axios.post(`/webrtc/subscribers/${subscriberId}/create`).then((res) => res.data);

  const transport: SubscriberTransport = device.createRecvTransport({ ...options, appData: { subscriberId } }) as SubscriberTransport;

  transport.rtpCapabilities = device.rtpCapabilities;

  transport.on('connect', async ({ dtlsParameters }, onComplete, onError) => {
    try {
      await axios.post(`/webrtc/subscribers/${subscriberId}/connect`, { dtlsParameters });
      onComplete();
    } catch (error) {
      onError(error);
    }
  });

  return transport;
}

export function useTransport(subscriberId: string): ConsumerCreator {
  const ref = useRef<SubscriberTransport | Promise<SubscriberTransport>>(null);

  useEffect(() => {
    axios.post(`/webrtc/subscribers/${subscriberId}/disconnect`).catch(() => {});
    window.addEventListener('beforeunload', () => axios.post(`/webrtc/subscribers/${subscriberId}/disconnect`).catch(() => {}));
  }, [subscriberId]);

  return async (peerId: string, mediaTag: string, onError = () => {}) => {
    try {
      if (!ref.current) {
        ref.current = createTransport(subscriberId);
      }

      if (ref.current instanceof Promise) {
        ref.current = await ref.current;
      }

      const options = await axios.post(`/webrtc/subscribers/${subscriberId}/tracks/${peerId}/${mediaTag}`, {
        rtpCapabilities: ref.current.rtpCapabilities
      }).then((res) => res.data);

      const consumer = await ref.current.consume(options);

      while (ref.current.connectionState !== 'connected') {
        console.log(ref.current.connectionState);
        await new Promise((r) => setTimeout(r, 100));
      }

      await axios.post(`/webrtc/subscribers/${subscriberId}/tracks/${peerId}/${mediaTag}/resume`);
      consumer.resume();

      return consumer;
    } catch (error) {
      onError();
      console.error(error);
      toast.error('Не удалось установить связь с сервером, пожалуйста проверьте соединение сети');
      return null;
    }
  }
}
