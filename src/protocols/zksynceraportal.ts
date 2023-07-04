import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';

export const ZkSyncEraPortal = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'zkSync Era Portal',
      id: 'zksynceraportal',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://portal.zksync.io/bridge',
    };

    transactions.forEach((transaction: Transaction) => {
      if (
        (transaction.to.toLowerCase() === '0x000000000000000000000000000000000000800a' &&
          transaction.data.startsWith('0x51cff8d9')) ||
        (transaction.to.toLowerCase() === address.toLowerCase() && transaction.isL1Originated)
      ) {
        protocolState.interactions += 1;
        protocolState.volume += parseInt(transaction.value) * 10 ** -18 * transaction.ethValue;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
    });

    return protocolState;
  },
};
