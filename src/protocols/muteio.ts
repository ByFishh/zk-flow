import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods } from '../utils/utils.ts';

const muteRouter = '0x8b791913eb07c32779a16750e3868aa8495f5964';

const mutePools: string[] = [
  '0xdfaab828f5f515e104baaba4d8d554da9096f0e4',
  '0xb85feb6af3412d690dfda280b73eaed73a2315bc',
];

export const Mute = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Mute.io',
      id: 'muteio',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://mute.io/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (muteRouter.includes(transaction.to.toLowerCase()) || mutePools.includes(transaction.to.toLowerCase())) {
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
      mutePools.concat([muteRouter]),
    ).days;

    return protocolState;
  },
};
