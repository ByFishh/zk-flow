import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { sortTransfer } from '../utils/utils.ts';

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
      const erc20Transfers = transaction.erc20Transfers.sort(sortTransfer);
      if (erc20Transfers.length === 0) return;

      if (
        (transaction.data.contractAddress.toLowerCase() === '0x000000000000000000000000000000000000800a' &&
          transaction.data.calldata.startsWith('0x51cff8d9')) ||
        (transaction.data.contractAddress.toLowerCase() === address.toLowerCase() && transaction.isL1Originated)
      ) {
        protocolState.interactions += 1;
        protocolState.volume +=
          parseInt(erc20Transfers[0].amount, 16) *
          10 ** -erc20Transfers[0].tokenInfo.decimals *
          erc20Transfers[0].tokenInfo.usdPrice;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
    });

    return protocolState;
  },
};
