import { getProducers } from "@/shared/api";
import axios from "axios";
import { useState } from "react";
import useWebSocket from "react-use-websocket";

export function useMediaTags(peerId: string, subscriberId: string) {
  const [mediaTags, setMediaTags] = useState([]);

  useWebSocket('/ws/peers/' + peerId, {
    async onOpen() {
      setMediaTags(await getProducers(peerId));
    },
    async onMessage(ev) {
      const { event, mediaTag } = JSON.parse(ev.data);
    
      if (event === 'producer-closed') {
        axios.post(`/webrtc/subscribers/${subscriberId}/tracks/${peerId}/${mediaTag}/close`);
        setMediaTags((mediaTags) => mediaTags.filter((tag) => tag !== mediaTag));
      }

      if (event === 'producer-created') {
        setMediaTags((mediaTags) => [...mediaTags, mediaTag]); 
      }
    }
  })

  return mediaTags;
}