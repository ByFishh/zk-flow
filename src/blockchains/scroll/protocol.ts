import { Protocol } from '../types.ts';
import { Transaction } from './types.ts';
import { Basilisk } from './protocols/basilisk.ts';
import { OfficialBridge } from './protocols/officialbridge.ts';

const getProtocols = (address: string, transactions: Transaction[]): Protocol[] => {
  const protocols: Protocol[] = [];
  address;
  protocols.push(Basilisk.getProtocolsState(transactions));
  protocols.push(OfficialBridge.getProtocolsState(transactions));

  protocols.sort((a, b) => b.volume - a.volume);

  return protocols;
};

export { getProtocols };
