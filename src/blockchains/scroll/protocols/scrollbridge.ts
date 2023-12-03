import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = ['0x6ea73e05adc79974b931123675ea8f78ffdacdf0'];

const Scrollbridge = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'Scroll Bridge',
      id: 'scrollbridge',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://scroll.io/bridge',
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

export { Scrollbridge };
