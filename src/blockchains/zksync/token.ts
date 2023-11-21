import { BLOCKCHAINS, BlockchainType, Token } from '../types.ts';
import axios from 'axios';

const getTokens = async (address: string, blockchain: BlockchainType): Promise<Token[]> => {
  const tokens: Token[] = [];
  const response = await axios.get(BLOCKCHAINS[blockchain].tokenEndpoint.replace('%ADDRESS%', address));

  for (const rawToken of response.data) {
    const token: Token = {
      name: rawToken.token.name,
      symbol: rawToken.token.symbol,
      link: BLOCKCHAINS[blockchain].explorer.replace('%ADDRESS%', rawToken.token.address),
      balance: rawToken.value * 10 ** -Number(rawToken.token.decimals),
      type: rawToken.token.type,
    };
    tokens.push(token);
  }

  return tokens;
};

export { getTokens };
