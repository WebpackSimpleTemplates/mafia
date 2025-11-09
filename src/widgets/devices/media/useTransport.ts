import type { Producer, Transport } from "mediasoup-client/types";
import { Device } from 'mediasoup-client';
import { useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { userIdSelector } from "@/shared/store";
import { toast } from 'react-toastify';

export type ProducerCreator = (mediaTag: string, track: MediaStreamTrack, onError: () => void) => Promise<Producer>;

async function createTransport(peerId: string): Promise<Transport> {
  const routerRtpCapabilities = await axios.get('/webrtc/rtp-capabilities').then((res) => res.data);

  const device = new Device();
  await device.load({ routerRtpCapabilities });

  const options = await axios.post(`/webrtc/peers/${peerId}/create`).then((res) => res.data);

  const transport = device.createSendTransport({ ...options, appData: { peerId } });

  transport.on('connect', async ({ dtlsParameters }, onComplete, onError) => {
    try {
      await new Promise((r) => setTimeout(r, 100));
      await axios.post(`/webrtc/peers/${peerId}/connect`, { dtlsParameters });
      onComplete();
    } catch (error) {
      onError(error);
    }
  });

  transport.on('produce', async ({ kind, rtpParameters, appData }, onComplete, onError) => {
    try {
      const { id } = await axios.post(`/webrtc/peers/${peerId}/tracks/${appData.mediaTag}`, { kind, rtpParameters }).then((res) => res.data);

      onComplete({ id });
    } catch (error) {
      onError(error);
    }
  });

  return transport;
}

export function useTransport(peerId: string): ProducerCreator {
  const ref = useRef<Transport | Promise<Transport>>(null);

  return async (mediaTag: string, track: MediaStreamTrack, onError) => {
    try {
      if (!ref.current) {
        ref.current = createTransport(peerId);
      }

      if (ref.current instanceof Promise) {
        ref.current = await ref.current;
      }

      const producer = await ref.current.produce({ track, appData: { mediaTag } });
      producer.on('@close', () => axios.post(`/webrtc/peers/${peerId}/tracks/${mediaTag}/close`));

      return producer;
    } catch (error) {
      onError();
      console.error(error);
      toast.error('Не удалось установить связь с сервером, пожалуйста проверьте соединение сети');
      return null;
    }
  }
}
