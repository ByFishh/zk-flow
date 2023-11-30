import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x1e8f1099a3fe6d2c1a960528394f4feb8f8a288d',
  '0x01541ead71e41d59f315eb2ce3a9441ed7b0a63e',
  '0x1bd39618892115fcf674112b657c3aad1d1b9602',
  '0x827b641c69228a3f259e7904f63f63c405ba6534',
  '0x2f66631fd6e48b21de53c3777d638132675f7c6a',
  '0x4085f99720e699106bc483dab6caed171eda8d15',
];

const Basilisk = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'Basilisk',
      id: 'basilisk',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://app.basilisk.org/',
    };

    for (const transaction of transactions) {
      if (addresses.includes(transaction.to.toLowerCase()) || addresses.includes(transaction.from.toLowerCase())) {
        if (protocol.lastActivity === 0) protocol.lastActivity = transaction.timeStamp * 1000;
        if (new Date(protocol.lastActivity) < new Date(transaction.timeStamp * 1000))
          protocol.lastActivity = transaction.timeStamp * 1000;
        protocol.interactions += 1;

        if (!transaction.transfers.length) continue;
        protocol.volume += transaction.transfers[0].transferPrice;
      }
    }

    protocol.activeDays = countTransactionPeriods(transactions, protocol.id, addresses);

    return protocol;
  },
};

export { Basilisk };
