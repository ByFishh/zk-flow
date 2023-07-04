import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

const orbiterRouters: string[] = [
  '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8',
  '0x80c67432656d59144ceff962e8faf8926599bcf8',
  '0xee73323912a4e3772b74ed0ca1595a152b0ef282',
  '0x0a88BC5c32b684D467b43C06D9e0899EfEAF59Df',
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
      if (
        orbiterRouters.includes(transaction.to.toLowerCase()) ||
        orbiterRouters.includes(transaction.from.toLowerCase())
      ) {
        protocolState.interactions += 1;
        protocolState.volume += parseInt(transaction.value, 16) * 10 ** -18;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
    });

    protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, orbiterRouters).days;

    return protocolState;
  },
};
