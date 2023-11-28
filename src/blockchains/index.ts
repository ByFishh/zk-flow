import { Blockchain, Wallet } from './types.ts';
import { getWallet as getScrollWallet } from './scroll/wallet.ts';
import { getWallet as getZkSyncWallet } from './zksync/wallet.ts';

const blockchains = {
  [Blockchain.zkSync]: getZkSyncWallet,
  [Blockchain.scroll]: getScrollWallet,
};

const getWallet = async (address: string, blockchain: Blockchain): Promise<Wallet> => {
  return await blockchains[blockchain](address);
};

export { getWallet };
