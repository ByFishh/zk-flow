import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';

const countTransactionPeriods = (transactions: Transaction[]): number => {
  const uniqueDays: Set<string> = new Set();

  for (const transaction of transactions) {
    if (!Number(transaction.isL1Originated)) continue;

    const timestamp = new Date(transaction.timeStamp * 1000);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    const day = timestamp.getDate();

    uniqueDays.add(`${year}-${month}-${day}`);
  }

  return uniqueDays.size;
};

const Zksyncbridge = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'zkSync Bridge',
      id: 'zksyncbridge',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://portal.txsync.io/bridge/',
    };

    for (const transaction of transactions) {
      if (!Number(transaction.isL1Originated)) continue;
      if (protocol.lastActivity === 0) protocol.lastActivity = transaction.timeStamp * 1000;
      if (new Date(protocol.lastActivity) < new Date(transaction.timeStamp * 1000))
        protocol.lastActivity = transaction.timeStamp * 1000;
      protocol.interactions += 1;

      if (!transaction.transfers.length) continue;
      protocol.volume += transaction.transfers[0].transferPrice;
    }

    protocol.activeDays = countTransactionPeriods(transactions);

    return protocol;
  },
};

export { Zksyncbridge };
