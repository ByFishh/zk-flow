import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

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
      if (
        velocoreRouter.includes(transaction.to.toLowerCase()) ||
        velocorePools.includes(transaction.to.toLowerCase())
      ) {
        protocolState.interactions += 1;
        protocolState.volume += parseInt(transaction.value) * 10 ** -18 * transaction.ethValue;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
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
