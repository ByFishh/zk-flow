import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x99Beb6E87e7F588630C1B98439bf1F6cE6D334a7',
  '0xca2f5fbBC321B8E69c64D0C5b2a97ba65a941FdB',
  '0x418Da3E36Bbe9e54C6c7644a40f0E16D6d709a1f',
  '0x72aE6CBc34AeCF6573655739739BF746346b7C84',
  '0xd61F9405503D4f4a09c30204F25401d9AF91C1E7',
  '0x75a7e4BE2A1333E5c8D4f139142f1741E10E6Db5',
  '0xb0Cfb48713e98Ac20726274818221B951ee79dD6'
];

const MacaronSwap = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'MacaronSwap',
      id: 'macaronswap',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://macaronswap.finance/',
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

export { MacaronSwap };
