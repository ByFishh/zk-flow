import { BLOCKCHAINS, BlockchainType, Token } from '../types.ts';
import axios from 'axios';
const getTokens = async (address: string, blockchain: BlockchainType): Promise<Token[]> => {
  const tokens: Token[] = [];
  const response = await axios.get(BLOCKCHAINS[blockchain].tokenEndpoint, {
    params: {
      module: 'account',
      action: 'tokenlist',
      address,
    },
  });

  for (const rawToken of response.data.result) {
    const token: Token = {
      name: rawToken.name,
      symbol: rawToken.symbol,
      link: BLOCKCHAINS[blockchain].explorer.replace('%ADDRESS%', rawToken.contractAddress),
      balance: Number(rawToken.balance) * 10 ** -Number(rawToken.decimals),
      type: rawToken.type,
    };
    tokens.push(token);
  }

  return tokens;
};

export { getTokens };
