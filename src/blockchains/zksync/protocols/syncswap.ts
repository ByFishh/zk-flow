import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x80115c708e12edd42e504c1cd52aea96c547c05c',
  '0x176b23f1ddfeedd10fc250b8f769362492ef810b',
  '0x4e7d2e3f40998daeb59a316148bfbf8efd1f7f3c',
  '0xae092fcec5fd04836b12e87da0d7ed3a707b38b0',
  '0x2da10a1e27bf85cedd8ffb1abbe97e53391c0295',
];

const Syncswap = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'Syncswap',
      id: 'syncswap',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://syncswap.xyz/',
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

export { Syncswap };
