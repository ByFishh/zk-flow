import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

const holdstationAddresses: string[] = [
  '0x7b4872e2096ec9410b6b8c8b7d039589e6ee8022',
  '0xaf08a9d918f16332f22cf8dc9abe9d9e14ddcbc2',
];

export const Holdstation = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Holdstation',
      id: 'holdstation',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://holdstation.exchange/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (holdstationAddresses.includes(transaction.to.toLowerCase())) {
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
      holdstationAddresses,
    ).days;

    return protocolState;
  },
};
