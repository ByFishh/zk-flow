import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

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
      if (zkSyncNameServiceAddresses.includes(transaction.data.contractAddress.toLowerCase())) {
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
      if (hasApprovedAddress(transaction, zkSyncNameServiceAddresses)) protocolState.approves += 1;
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
