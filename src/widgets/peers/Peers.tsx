import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPeer, peerSelector, peersSelector, type AppDispatch } from '@/shared/store';

const PeerItem = ({ id }: { id: number }) => {
  const dispatch: AppDispatch = useDispatch();
  const peer = useSelector(peerSelector(id));

  if (!peer) {
    return <></>;
  }

  return (
    <div
      onClick={() => dispatch(openPeer(peer.id))}
      className="flex flex-row items-center gap-3 p-3 hover:bg-base-300 transition-all cursor-pointer"
    >
      <img
        src={peer.avatar}
        className='w-12 h-12 rounded-full object-center object-cover'
      />
      <div className="text-lg font-semibold flex-1">
        {peer.name}
      </div>
    </div>
  );
}

export function Peers() {
  const [search, setSearch] = useState('');
  
  const peers = useSelector(peersSelector);

  return (
    <div className="w-full h-full p-3 overflow-auto bg-base-200 relative">
      <input
        className='input input-sm w-full'
        placeholder='Поиск по имени'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {peers
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((peer) => <PeerItem key={peer.id} id={peer.id} />)
      }
    </div>
  );
}