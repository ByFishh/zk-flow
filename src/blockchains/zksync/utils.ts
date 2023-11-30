import { Transaction } from './types.ts';
import { Contract, Fee, Interaction, Volume } from '../types.ts';

const getInteraction = (address: string, transactions: Transaction[]): Interaction => {
  const interaction: Interaction = {
    change: 0,
    total: 0,
  };

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.timeStamp * 1000);
    if (transaction.from.toLowerCase() === address.toLowerCase()) {
      interaction.total++;
      if (transactionDate > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) {
        interaction.change++;
      }
    }
  }

  return interaction;
};

const getVolume = async (transactions: Transaction[]): Promise<Volume> => {
  const volume: Volume = {
    change: 0,
    total: 0,
  };

  for (const transaction of transactions) {
    if (transaction.transfers.length) {
      volume.total += transaction.transfers[0].transferPrice;
    }
    const transactionDate = new Date(transaction.timeStamp * 1000);
    if (transactionDate > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) {
      if (transaction.transfers.length) volume.change += transaction.transfers[0].transferPrice;
    }
  }

  return volume;
};

const getFee = async (address: string, transactions: Transaction[], ethPrice: number): Promise<Fee> => {
  const fee: Fee = {
    change: 0,
    total: 0,
  };

  for (const transaction of transactions) {
    if (!transaction.gasPrice || !transaction.gasUsed || transaction.from.toLowerCase() !== address.toLowerCase())
      continue;
    fee.total += transaction.gasPrice * transaction.gasUsed;

    const transactionDate = new Date(transaction.timeStamp * 1000);
    if (transactionDate > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) {
      fee.change += transaction.gasPrice * transaction.gasUsed;
    }
  }

  fee.total *= 10 ** -18 * ethPrice;
  fee.change *= 10 ** -18 * ethPrice;

  return fee;
};

const getContract = (transactions: Transaction[]): Contract => {
  const interactedContracts: Set<string> = new Set();
  const interactedContractsChange: Set<string> = new Set();

  for (const transaction of transactions) {
    if (interactedContracts.has(transaction.to)) continue;
    interactedContracts.add(transaction.to);
    if (new Date(transaction.timeStamp).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
      interactedContractsChange.add(transaction.to);
    }
  }

  return {
    change: interactedContractsChange.size,
    total: interactedContracts.size,
  };
};

const countTransactionPeriods = (transactions: Transaction[], protocol: string, addresses: string[] = []): number => {
  const uniqueDays: Set<string> = new Set();

  transactions.forEach((transaction) => {
    if (
      protocol !== 'zksynceraportal' &&
      !addresses.includes(transaction.to.toLowerCase()) &&
      !addresses.includes(transaction.from.toLowerCase())
    )
      return;

    const timestamp = new Date(transaction.timeStamp * 1000);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    const day = timestamp.getDate();

    uniqueDays.add(`${year}-${month}-${day}`);
  });

  return uniqueDays.size;
};

export { getInteraction, getVolume, getFee, getContract, countTransactionPeriods };
