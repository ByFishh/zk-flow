import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { Transaction } from '../services/explorer.ts';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const syncSwapRouter = '0x2da10a1e27bf85cedd8ffb1abbe97e53391c0295';

const syncSwapPools: string[] = [
  '0x80115c708e12edd42e504c1cd52aea96c547c05c',
  '0x176b23f1ddfeedd10fc250b8f769362492ef810b',
  '0x4e7d2e3f40998daeb59a316148bfbf8efd1f7f3c',
  '0xae092fcec5fd04836b12e87da0d7ed3a707b38b0',
];

export const SyncSwap = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'SyncSwap',
      id: 'syncswap',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://syncswap.xyz/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (
        syncSwapRouter.includes(transaction.data.contractAddress.toLowerCase()) ||
        syncSwapPools.includes(transaction.data.contractAddress.toLowerCase())
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
      if (hasApprovedAddress(transaction, syncSwapPools.concat([syncSwapRouter]))) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(
      address,
      transactions,
      protocolState.id,
      syncSwapPools.concat([syncSwapRouter]),
    ).days;

    return protocolState;
  },
};
