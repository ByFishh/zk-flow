import { Transaction } from '../types.ts';
import { Protocol } from '../../types.ts';
import { countTransactionPeriods } from '../utils.ts';

const addresses: string[] = [
  '0x0700fb51560cfc8f896b2c812499d17c5b0bf6a7',
  '0xe8826fc3ce6e74932144dbc2b369e7b52e88193a',
  '0x7cf85f98c0339559eab22deea1e018721e800add',
  '0xb376fceacd9fef24a342645cbf72a4c439ea0614',
  '0xacf5a67f2fcfeda3946ccb1ad9d16d2eb65c3c96',
  '0x4ad9ee1698b6d521ebb2883dd9fc3655c7553561',
  '0x00f093ff2bca9da894396336286c7c5bd2310ca5',
  '0x307baa142ba2bfa4a3059efb631899c992a193ee',
  '0x77d807b74d54b81a87a5769176bc7719f676c8ce',
  '0xbe7d1fd1f6748bbdefc4fbacafbb11c6fc506d1d',
];

const SpaceFi = {
  getProtocolsState: (transactions: Transaction[]) => {
    const protocol: Protocol = {
      name: 'SpaceFi',
      id: 'spacefi',
      lastActivity: 0,
      volume: 0,
      interactions: 0,
      activeDays: 0,
      url: 'https://spacefi.io/',
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

export { SpaceFi };
