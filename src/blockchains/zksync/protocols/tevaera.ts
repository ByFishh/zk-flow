import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0xd29aa7bdd3cbb32557973dad995a3219d307721f',
  '0x1eb7bcab5edf75b5e02c9a72d3287e322ebaefdb',
  '0x50b2b7092bcc15fbb8ac74fe9796cf24602897ad',
  '0x0969529a8ea41b47009eb2a590fe71d7942e4f5a',
  '0x9fc20170d613766831f164f1831f4607ae54ff2d',
];

const Tevaera = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'Tevaera',
      id: 'tevaera',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://tevaera.com/',
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

export { Tevaera };
