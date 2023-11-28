import { AirdropItem, Wallet } from '../types.ts';
import { Transaction } from './types.ts';
import { getContract, getInteraction, getVolume } from './utils.ts';

const getAirdrop = async (address: string, transactions: Transaction[], wallet: Wallet): Promise<AirdropItem[]> => {
  const airdropItems: AirdropItem[] = [];

  const interaction = wallet.interaction.total;
  const contract = wallet.contract.total;
  const volume = wallet.volume.total;

  airdropItems.push({
    title: 'Bridge to zkSync',
    items: [
      {
        label: 'Native Bridge to zkSync Lite',
        checked: false,
      },
      {
        label: 'Native Bridge to zkSync Era',
        checked: false,
      },
    ],
  });
  airdropItems.push({
    title: 'Transactions over time',
    items: [
      {
        label: 'You’ve conducted transactions during 2 distinct months',
        checked: false,
      },
      {
        label: 'You’ve conducted transactions during 6 distinct months',
        checked: false,
      },
      {
        label: 'You’ve conducted transactions during 9 distinct months',
        checked: false,
      },
    ],
  });
  airdropItems.push({
    title: 'Transaction interaction',
    items: [
      {
        label: 'You’ve conducted more than 4 transactions OR interacted with more than 4 smart contracts',
        checked: interaction > 4 || contract > 4,
      },
      {
        label: 'You’ve conducted more than 10 transactions OR interacted with more than 10 smart contracts',
        checked: interaction > 10 || contract > 10,
      },
      {
        label: 'You’ve conducted more than 25 transactions OR interacted with more than 25 smart contracts',
        checked: interaction > 25 || contract > 25,
      },
      {
        label: 'You’ve conducted more than 100 transactions OR interacted with more than 100 smart contracts',
        checked: interaction > 100 || contract > 100,
      },
    ],
  });
  airdropItems.push({
    title: 'Transaction value',
    items: [
      {
        label: 'You’ve conducted transactions with more than $10,000',
        checked: volume > 10000,
      },
      {
        label: 'You’ve conducted transactions with more than $50,000',
        checked: volume > 50000,
      },
      {
        label: 'You’ve conducted transactions with more than $250,000',
        checked: volume > 250000,
      },
    ],
  });
  airdropItems.push({
    title: 'Assets bridge to zkSync',
    items: [
      {
        label: 'You’ve deposited more than $10,000 in ETH',
        checked: false,
      },
      {
        label: 'You’ve deposited more than $50,000 in ETH',
        checked: false,
      },
      {
        label: 'You’ve deposited more than $250,000 in ETH',
        checked: false,
      },
    ],
  });
  airdropItems.push({
    title: 'Activity on zkSync Lite',
    items: [
      {
        label: 'You’ve conducted transactions more than 3 transactions.',
        checked: false,
      },
      {
        label: 'You’ve conducted transactions more than 5 transactions.',
        checked: false,
      },
      {
        label: 'You’ve conducted transactions more than 10 transactions.',
        checked: false,
      },
    ],
  });

  return airdropItems;
};

export { getAirdrop };
