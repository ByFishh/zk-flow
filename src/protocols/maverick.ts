import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const maverickAddresses = [
  '0xfd54762d435a490405dda0fbc92b7168934e8525',
  '0x852639ee9dd090d30271832332501e87d287106c',
  '0x77ee88b1c9cce741ec35553730eb1f19cd45a379',
  '0x39e098a153ad69834a9dac32f0fca92066ad03f4',
];

export const Maverick = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Maverick',
      id: 'maverick',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://app.mav.xyz/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (maverickAddresses.includes(transaction.data.contractAddress.toLowerCase())) {
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
      if (hasApprovedAddress(transaction, maverickAddresses)) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, maverickAddresses).days;

    return protocolState;
  },
};
