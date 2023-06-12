import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const orbiterRouters: string[] = [
  '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8',
  '0x80c67432656d59144ceff962e8faf8926599bcf8',
  '0xee73323912a4e3772b74ed0ca1595a152b0ef282',
];

export const Orbiter = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Orbiter Finance',
      id: 'orbiter',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://orbiter.finance/',
    };

    transactions.forEach((transaction: Transaction) => {
      const erc20Transfers = transaction.erc20Transfers.sort(sortTransfer);
      if (
        orbiterRouters.includes(transaction.data.contractAddress.toLowerCase()) ||
        (erc20Transfers.length && orbiterRouters.includes(erc20Transfers[0].from)) ||
        (erc20Transfers.length && orbiterRouters.includes(erc20Transfers[0].to))
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
      if (hasApprovedAddress(transaction, orbiterRouters)) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, orbiterRouters).days;

    return protocolState;
  },
};
