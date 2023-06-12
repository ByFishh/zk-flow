import { Transaction } from '../services/explorer.ts';
import { ProtocolState } from '../components/ProtocolsCard.tsx';
import { countTransactionPeriods, hasApprovedAddress, sortTransfer } from '../utils/utils.ts';

const goal3Addresses: string[] = [
  '0xd2ca21df45479824f954a6e1759d436a57d63faf',
  '0x1f090f91ee09768ca36dcd52640f4a5eae146555',
  '0xc523df658dbec88dc03fb23a703bcbd7ffb5ea01',
  '0x116a4a5ed4c7d5712e109d4188e17616d8e5784a',
  '0x8d123a2a0a7c98555931ceda6917b865b7345164',
];

export const Goal3 = {
  getProtocolsState: (transactions: Transaction[], address: string) => {
    const protocolState: ProtocolState = {
      name: 'Goal3',
      id: 'goal3',
      lastActivity: '',
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
      url: 'https://beta.goal3.xyz/',
      tag: 'Gasless',
    };

    transactions.forEach((transaction: Transaction) => {
      if (goal3Addresses.includes(transaction.data.contractAddress.toLowerCase())) {
        if (transaction.data.calldata.startsWith('0xbd95e4f1')) {
          const zkUsdValue = parseInt(transaction.data.calldata.slice(-64), 16) * 10 ** -6;
          protocolState.volume += zkUsdValue;
        } else {
          const erc20Transfers = transaction.erc20Transfers.sort(sortTransfer);

          protocolState.volume +=
            parseInt(erc20Transfers[0].amount, 16) *
            10 ** -erc20Transfers[0].tokenInfo.decimals *
            erc20Transfers[0].tokenInfo.usdPrice;
        }
        protocolState.interactions += 1;

        if (protocolState.lastActivity === '') protocolState.lastActivity = transaction.receivedAt;
        if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt))
          protocolState.lastActivity = transaction.receivedAt;
      }
      if (hasApprovedAddress(transaction, goal3Addresses)) protocolState.approves += 1;
    });

    protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, goal3Addresses).days;

    return protocolState;
  },
};
