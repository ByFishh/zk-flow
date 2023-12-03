import { Protocol } from '../types.ts';
import { Transaction } from './types.ts';
import { Scrollbridge } from './protocols/scrollbridge.ts';
import { Orbiter } from './protocols/orbiter.ts';
import { Syncswap } from './protocols/syncswap.ts';
import { ScrollNameService } from './protocols/scrollnameservice.ts';
import { Dodo } from './protocols/dodo.ts';
import { Skydrome } from './protocols/skydrome.ts';

const getProtocols = (address: string, transactions: Transaction[]): Protocol[] => {
  const protocols: Protocol[] = [];
  address;
  protocols.push(Orbiter.getProtocolsState(transactions));
  protocols.push(Scrollbridge.getProtocolsState(transactions));
  protocols.push(Syncswap.getProtocolsState(transactions));
  protocols.push(ScrollNameService.getProtocolsState(transactions));
  protocols.push(Dodo.getProtocolsState(transactions));
  protocols.push(Skydrome.getProtocolsState(transactions));

  protocols.sort((a, b) => b.volume - a.volume);

  return protocols;
};

export { getProtocols };
