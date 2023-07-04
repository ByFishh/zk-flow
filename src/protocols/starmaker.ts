import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

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
      if (starmarkerAddresses.includes(transaction.to.toLowerCase())) {
        protocolState.interactions += 1;
        protocolState.volume += parseInt(transaction.value, 16) * 10 ** -18;
        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
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
