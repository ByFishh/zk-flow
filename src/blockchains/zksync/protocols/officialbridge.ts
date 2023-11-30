import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const OfficialBridge = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'OfficialBridge',
      id: 'officialbridge',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://app.basilisk.org/',
    };

    for (const transaction of transactions) {
      if (!transaction.isL1Originated) continue;
      console.log(transaction.isL1Originated);
      if (protocol.lastActivity === 0) protocol.lastActivity = transaction.timeStamp * 1000;
      if (new Date(protocol.lastActivity) < new Date(transaction.timeStamp * 1000))
        protocol.lastActivity = transaction.timeStamp * 1000;
      protocol.interactions += 1;

      if (!transaction.transfers.length) continue;
      protocol.volume += transaction.transfers[0].transferPrice;
    }

    protocol.activeDays = countTransactionPeriods(transactions, protocol.id, []);

    return protocol;
  },
};

export { OfficialBridge };
