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
    items: [
      {
        title: 'Bridge to Scroll',
        items: [
          {
            label: 'Native Bridge to Scroll',
            checked: wallet.protocols.find((protocol) => protocol.id === 'scrollbridge')!.volume > 0,
          },
        ],
      },
      {
        title: 'Transactions over time',
        items: [
          {
            label: 'You’ve conducted transactions during 2 distinct months',
            checked: Number(wallet.additionalInfos.find((info) => info.label === 'Unique months')!.value) > 2,
          },
          {
            label: 'You’ve conducted transactions during 6 distinct months',
            checked: Number(wallet.additionalInfos.find((info) => info.label === 'Unique months')!.value) > 6,
          },
          {
            label: 'You’ve conducted transactions during 9 distinct months',
            checked: Number(wallet.additionalInfos.find((info) => info.label === 'Unique months')!.value) > 9,
          },
        ],
      },
      {
        title: 'Transaction interaction',
        items: [
          {
            label: 'You’ve conducted more than 4 transactions OR interacted with more than 4 smart contracts',
            checked: wallet.interaction.total > 4 || wallet.contract.total > 4,
          },
          {
            label: 'You’ve conducted more than 10 transactions OR interacted with more than 10 smart contracts',
            checked: wallet.interaction.total > 10 || wallet.contract.total > 10,
          },
          {
            label: 'You’ve conducted more than 25 transactions OR interacted with more than 25 smart contracts',
            checked: wallet.interaction.total > 25 || wallet.contract.total > 25,
          },
          {
            label: 'You’ve conducted more than 100 transactions OR interacted with more than 100 smart contracts',
            checked: wallet.interaction.total > 100 || wallet.contract.total > 100,
          },
        ],
      },
      {
        title: 'Transaction value',
        items: [
          {
            label: 'You’ve conducted transactions with more than $10,000',
            checked: wallet.volume.total > 10000,
          },
          {
            label: 'You’ve conducted transactions with more than $50,000',
            checked: wallet.volume.total > 50000,
          },
          {
            label: 'You’ve conducted transactions with more than $250,000',
            checked: wallet.volume.total > 250000,
          },
        ],
      },
      {
        title: 'Assets bridge to Scroll',
        items: [
          {
            label: 'You’ve deposited more than $10,000 in ETH',
            checked: wallet.protocols.find((protocol) => protocol.id === 'scrollbridge')!.volume > 10000,
          },
          {
            label: 'You’ve deposited more than $50,000 in ETH',
            checked: wallet.protocols.find((protocol) => protocol.id === 'scrollbridge')!.volume > 50000,
          },
          {
            label: 'You’ve deposited more than $250,000 in ETH',
            checked: wallet.protocols.find((protocol) => protocol.id === 'scrollbridge')!.volume > 250000,
          },
        ],
      },
    ],
  };

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
