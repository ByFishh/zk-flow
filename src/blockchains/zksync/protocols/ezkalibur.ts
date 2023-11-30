import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x17a48ce80a7f7f3f774390179b1a404ce9c9a77e',
  '0x15c664a62086c06d43e75bb3fdded93008b8ce63',
  '0x498f7bb59c61307de7dea005877220e4406470e9',
  '0x240f765af2273b0cab6caff2880d6d8f8b285fa4',
  '0x11ef47783740b3f0c9736d54be8ef8953c3ead99',
  '0xe67d7d52adb6a14c64b9b1ff8dfec081dd12295e',
  '0x6a6d643bdb63bc4d74d166abee57b1be5b3aa9ab',
];

const Ezkalibur = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'Ezkalibur',
      id: 'ezkalibur',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://ezkalibur.com/',
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

export { Ezkalibur };
