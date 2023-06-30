import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

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
        zkSyncIdAddresses.includes(transaction.data.contractAddress.toLowerCase()) ||
        zkSyncIdAddresses.includes(transaction.data.contractAddress.toLowerCase())
      ) {
        const erc20Transfers = transaction.erc20Transfers.sort(sortTransfer);

        protocolState.interactions += 1;
        protocolState.volume +=
          parseInt(erc20Transfers[0].amount, 16) *
          10 ** -erc20Transfers[0].tokenInfo.decimals *
          erc20Transfers[0].tokenInfo.usdPrice;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
      if (hasApprovedAddress(transaction, zkSyncIdAddresses)) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, zkSyncIdAddresses).days;

    return protocolState;
  },
};
