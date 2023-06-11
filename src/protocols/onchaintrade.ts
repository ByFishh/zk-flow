import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const onchainTradeAddresses: string[] = [
  '0x84c18204c30da662562b7a2c79397c9e05f942f0',
  '0xca806b267fc0c1c12edbf77a2e5bca5939c7d953',
  '0xaa08a6d7b10724d03b8f4857d4fa14e7f92814e3',
  '0x10c8044ae3f2b1c7decb439ff2dc1164d750c39d',
  '0xe676b11421d68a28ba50920f2841183af93067a2',
  '0x6219f06135b79705d34f5261852e9f6b98821e1f',
];

export const OnchainTrade = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Onchain Trade',
      id: 'onchaintrade',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://onchain.trade/',
    };

    transactions.forEach((transaction: Transaction) => {
      if (onchainTradeAddresses.includes(transaction.data.contractAddress.toLowerCase())) {
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
      if (hasApprovedAddress(transaction, onchainTradeAddresses)) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(
      address,
      transactions,
      protocolState.id,
      onchainTradeAddresses,
    ).days;

    return protocolState;
  },
};
