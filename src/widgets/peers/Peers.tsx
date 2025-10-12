import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { Peer } from './Peer';

const peersSource = new Array(30).fill(null).map((_, id) => ({
  id,
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
}));

const votesSource = new Array(30).fill(null).map(() => ({
  peerId: Math.random() * 30 >> 0,
}));

export function Peers() {
  const [search, setSearch] = useState('');
  
  const [peers] = useState(peersSource);
  
  const [activePeerId, setActivePeerId] = useState<number>(null);

  const activePeer = peers.find((p) => p.id === activePeerId);

  const [votes] = useState(votesSource);

  return (
    <div className="w-sm h-full relative overflow-hidden">
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
          .map((peer) => {
            const peerVotes = votes.filter((v) => v.peerId === peer.id).length

            return (
              <div
                key={peer.id}
                onClick={() => setActivePeerId(peer.id)}
                className="flex flex-row items-center gap-3 p-3 hover:bg-base-300 transition-all cursor-pointer"
              >
                <img
                  src={peer.avatar}
                  className='w-12 h-12 rounded-full object-center object-cover'
                />
                <div className="text-lg font-semibold flex-1">
                  {peer.name}
                </div>
                {!!peerVotes && (
                  <div className="h-5 w-5 flex items-center justify-center text-center rounded-full bg-primary">
                    {peerVotes}
                  </div>
                )}
              </div>
            );
          })
        }
      </div>
      {activePeer && (
        <Peer 
          {...activePeer}
          onClose={() => setActivePeerId(null)}
          votes={votes.filter((v) => v.peerId === activePeer.id).length}
        />
      )}
    </div>
  );
}