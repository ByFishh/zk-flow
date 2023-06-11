import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const starmarkerAddresses = ['0x1bdb8250eaf3c596441e6c3417c9d5195d6c85b9'];

export const Starmaker = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Starmaker',
      id: 'starmaker',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://starmaker.exchange/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (starmarkerAddresses.includes(transaction.data.contractAddress.toLowerCase())) {
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
      if (hasApprovedAddress(transaction, starmarkerAddresses)) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(
      address,
      transactions,
      protocolState.id,
      starmarkerAddresses,
    ).days;

    return protocolState;
  },
};
