import { BLOCKCHAINS, BlockchainType, Token } from '../types.ts';
import { getTokens as getZkSyncToken } from '../zksync/token.ts';
import axios from 'axios';

const blockchains = {
  zkSync: getZkSyncToken,
  scroll: () => [],
  base: () => [],
};

const getTokens = async (address: string, blockchain: BlockchainType): Promise<Token[]> => {
  const tokens = (await blockchains[blockchain](address, blockchain)).sort((a) => (a.type === 'ERC-721' ? 1 : -1));

  const response = await axios.get(BLOCKCHAINS[blockchain].apiEndpoint, {
    params: {
      module: 'account',
      action: 'balance',
      address,
    },
  });

  tokens.unshift({
    name: 'Ethereum',
    symbol: 'ETH',
    link: BLOCKCHAINS[blockchain].explorer.replace('%ADDRESS%', address),
    balance: Number(response.data.result) * 10 ** -18,
    type: 'NATIVE',
  });

  return tokens;
};

export { getTokens };
