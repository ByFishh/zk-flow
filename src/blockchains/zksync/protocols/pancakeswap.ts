import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0xf8b59f3c3ab33200ec80a8a58b2aa5f5d2a8944c',
  '0xa815e2ed7f7d5b0c49fda367f249232a1b9d2883',
  '0x5aeaf2883fbf30f3d62471154eda3c0c1b05942d',
  '0xd03d8d566183f0086d8d09a84e1e30b58dd5619d',
];

const PancakeSwap = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'PancakeSwap',
      id: 'pancakeswap',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://pancakeswap.finance/?chain=zkSync',
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

export { PancakeSwap };
