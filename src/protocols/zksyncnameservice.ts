import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

const zkSyncNameServiceAddresses = ['0xae23b6e7f91ddebd3b70d74d20583e3e674bd94f'];

export const ZkSyncNameService = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'zkSync Name Service',
      id: 'zksyncnameservice',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://app.zkns.domains/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (zkSyncNameServiceAddresses.includes(transaction.to.toLowerCase())) {
        protocolState.interactions += 1;
        protocolState.volume += parseInt(transaction.value, 16) * 10 ** -18;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
    });

    protocolState.activeDays = countTransactionPeriods(
      address,
      transactions,
      protocolState.id,
      zkSyncNameServiceAddresses,
    ).days;

    return protocolState;
  },
};
