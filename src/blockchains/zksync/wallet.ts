import { Airdrop, Wallet } from '../types.ts';
import { getTransactions } from './transaction.ts';
import { Transaction } from './types.ts';
import { getTokens } from './token.ts';
import { assignTransfers, assignTransfersValue } from './transfer.ts';
import axios from 'axios';
import { getProtocols } from './protocol.ts';
import { getContract, getFee, getInteraction, getVolume } from './utils.ts';
import { getAdditionalInfos } from './additional.ts';
import { getAirdrop } from './airdrop.ts';

const getWallet = async (address: string): Promise<Wallet> => {
  const transactions: Transaction[] = await getTransactions(address);
  const nativeTokenPrice =
    Number((await axios.get('https://api.etherscan.io/api?module=stats&action=ethprice')).data.result.ethusd) || 2000;

  await assignTransfers(transactions, address);
  await assignTransfersValue(transactions, nativeTokenPrice);

  const tmp: Wallet = {
    address,
    interaction: getInteraction(address, transactions),
    volume: await getVolume(transactions, nativeTokenPrice),
    fee: await getFee(address, transactions, nativeTokenPrice),
    contract: getContract(transactions),
    tokens: await getTokens(address),
    additionalInfos: await getAdditionalInfos(address, transactions),
    protocols: getProtocols(address, transactions),
    airdrop: {} as Airdrop,
  };

  tmp.airdrop = await getAirdrop(address, transactions, tmp);

  return tmp;
};

export { getWallet };
