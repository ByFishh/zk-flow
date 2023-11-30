import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x7642e38867860d4512fcce1116e2fb539c5cdd21',
  '0xf100ff84b363af74e3fcdff554e3da3309159458',
  '0x4eaaab540065b4e404d79fe1f0bf3a9c046f9151',
  '0x6f89797fe9c97e57a1137fa70caa69f8abbfff50',
  '0x18381c0f738146fb694de18d1106bde2be040fa4',
];

const ZkSwap = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'ZkSwap',
      id: 'zkswap',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://zkswap.finance/',
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

export { ZkSwap };
