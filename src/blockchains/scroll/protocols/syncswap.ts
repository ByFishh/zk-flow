import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = ['0x80e38291e06339d10aab483c65695d004dbd5c69'];

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

    protocol.activeDays = countTransactionPeriods(transactions, addresses);

    return protocol;
  },
};

export { Syncswap };
