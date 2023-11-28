import { BlockchainType, Contract, Fee, Interaction, Volume, Wallet } from '../types.ts';
import { getTransactions } from './transaction.ts';
import { Transaction } from './types.ts';
import { getTokens } from './token.ts';
import { assignTransfers, assignTransfersValue } from './transfer.ts';
import axios from 'axios';

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

const getVolume = async (transactions: Transaction[], ethPrice: number): Promise<Volume> => {
  const volume: Volume = {
    change: 0,
    total: 0,
  };

  for (const transaction of transactions) {
    const value = Number(transaction.value);
    volume.total += value;
    if (transaction.transfers.length) volume.total += transaction.transfers[0].transferPrice;
    const transactionDate = new Date(transaction.timeStamp * 1000);
    if (transactionDate > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) {
      volume.change += value;
      if (transaction.transfers.length) volume.total += transaction.transfers[0].transferPrice;
    }
  }

  volume.total *= 10 ** -18 * ethPrice;
  volume.change *= 10 ** -18 * ethPrice;

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

const getWallet = async (address: string, blockchain: BlockchainType): Promise<Wallet> => {
  const transactions: Transaction[] = await getTransactions(address, blockchain);
  const ethPrice =
    Number((await axios.get('https://api.etherscan.io/api?module=stats&action=ethprice')).data.result.ethusd) || 2000;

  await assignTransfers(transactions, address, blockchain);
  await assignTransfersValue(transactions, ethPrice);

  return {
    address,
    interaction: getInteraction(address, transactions),
    volume: await getVolume(transactions, ethPrice),
    fee: await getFee(address, transactions, ethPrice),
    contract: getContract(transactions),
    tokens: await getTokens(address, blockchain),
    additionalInfos: [],
    protocols: [],
  };
};

export { getWallet };
