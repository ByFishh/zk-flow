import { Token } from '../types.ts';
import axios from 'axios';

const tokenEndpoint = 'https://zksync.blockscout.com/api/v2/addresses/%ADDRESS%/token-balances';
const explorer = 'https://explorer.zksync.io/address/%ADDRESS%';
const apiEndpoint = 'https://block-explorer-api.mainnet.zksync.io/api';

const getNativeBalance = async (address: string): Promise<Token> => {
  const response = await axios.get(apiEndpoint, {
    params: {
      module: 'account',
      action: 'balance',
      address,
    },
  });

  return {
    name: 'Ethereum',
    symbol: 'ETH',
    link: explorer.replace('%ADDRESS%', address),
    balance: Number(response.data.result) * 10 ** -18,
    type: 'NATIVE',
  };
};

const getTokens = async (address: string): Promise<Token[]> => {
  const tokens: Token[] = [];
  const response = await axios.get(tokenEndpoint.replace('%ADDRESS%', address));

  for (const rawToken of response.data) {
    const token: Token = {
      name: rawToken.token.name,
      symbol: rawToken.token.symbol,
      link: explorer.replace('%ADDRESS%', rawToken.token.address),
      balance: rawToken.value * 10 ** -Number(rawToken.token.decimals),
      type: rawToken.token.type,
    };
    tokens.push(token);
  }

  tokens.sort((a) => (a.type === 'ERC-721' ? 1 : -1));
  tokens.unshift(await getNativeBalance(address));

  return tokens;
};

export { getTokens };
