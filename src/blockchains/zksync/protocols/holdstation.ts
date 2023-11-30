import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x7b4872e2096ec9410b6b8c8b7d039589e6ee8022',
  '0xaf08a9d918f16332f22cf8dc9abe9d9e14ddcbc2',
  '0x51956481ced6f65458a25207e725cbd2e33a02cb',
  '0x19b1ae9fd718107da3bed1f39ed9b3a5adbe89c0',
];

const Holdstation = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'Holdstation',
      id: 'holdstation',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://holdstation.exchange/',
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

export { Holdstation };
