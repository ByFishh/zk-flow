import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

const zkSyncIdAddresses = ['0xa531ece441138d8ce52642ad497059f2a79fd96f'];

export const ZkSyncId = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'zkSync ID',
      id: 'zksyncid',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://www.zksyncid.xyz/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (
        zkSyncIdAddresses.includes(transaction.to.toLowerCase()) ||
        zkSyncIdAddresses.includes(transaction.to.toLowerCase())
      ) {
        protocolState.interactions += 1;
        protocolState.volume += parseInt(transaction.value, 16) * 10 ** -18;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
    });

    protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, zkSyncIdAddresses).days;

    return protocolState;
  },
};
