import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const velocoreRouter = '0xd999e16e68476bc749a28fc14a0c3b6d7073f50c';

const velocorePools: string[] = ['0xcd52cbc975fbb802f82a1f92112b1250b5a997df'];

export const Velocore = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Velocore',
      id: 'velocore',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://velocore.xyz/',
    };

    transactions.forEach((transaction: Transaction) => {
      const erc20Transfers = transaction.erc20Transfers.sort(sortTransfer);

      if (
        velocoreRouter.includes(transaction.data.contractAddress.toLowerCase()) ||
        velocorePools.includes(transaction.data.contractAddress.toLowerCase())
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
      if (hasApprovedAddress(transaction, velocorePools.concat([velocoreRouter]))) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(
      address,
      transactions,
      protocolState.id,
      velocorePools.concat([velocoreRouter]),
    ).days;

    return protocolState;
  },
};
