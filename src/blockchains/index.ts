import { BlockchainType, Wallet } from './types.ts';
import { getWallet as getBlockScoutWallet } from './blockscout/wallet.ts';

const blockchains = {
  zkSync: getBlockScoutWallet,
  scroll: getBlockScoutWallet,
  base: getBlockScoutWallet,
};

const getWallet = async (address: string, blockchain: BlockchainType): Promise<Wallet> => {
  return await blockchains[blockchain](address, blockchain);
};

export { getWallet };
