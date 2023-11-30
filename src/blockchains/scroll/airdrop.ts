import { Airdrop, Wallet } from '../types.ts';

const getAirdropAmount = (taskCount: number): number => {
  if (taskCount < 3) return 0;
  if (taskCount === 3) return 1250;
  if (taskCount === 4) return 1750;
  if (taskCount === 5) return 2250;
  if (taskCount === 6) return 3250;
  if (taskCount === 7) return 3750;
  if (taskCount === 8) return 4250;
  if (taskCount === 9) return 6250;
  if (taskCount === 10) return 6750;
  if (taskCount === 11) return 7250;
  return 10250;
};

const getAirdrop = async (wallet: Wallet): Promise<Airdrop> => {
  const airdrop: Airdrop = {
    checked: 0,
    total: 0,
    value: 0,
    items: [],
  };

  const interaction = wallet.interaction.total;
  const contract = wallet.contract.total;
  const volume = wallet.volume.total;

  airdrop.items.push({
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
  airdrop.items.push({
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
  airdrop.items.push({
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
  airdrop.items.push({
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
  airdrop.items.push({
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
  airdrop.items.push({
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

  for (const item of airdrop.items) {
    for (const subitem of item.items) {
      if (subitem.checked) {
        airdrop.checked++;
      }
      airdrop.total++;
    }
  }
  airdrop.value = getAirdropAmount(airdrop.checked);

  return airdrop;
};

export { getAirdrop };
