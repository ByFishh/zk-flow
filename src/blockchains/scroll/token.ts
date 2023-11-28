import { Token } from '../types.ts';
import axios from 'axios';

const tokenEndpoints = 'https://blockscout.scroll.io/api';
const explorer = 'https://scrollscan.com/address/%ADDRESS%';
const apiEndpoint = 'https://api.scrollscan.com/api';

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
  const response = await axios.get(tokenEndpoints, {
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
      link: explorer.replace('%ADDRESS%', rawToken.contractAddress),
      balance: Number(rawToken.balance) * 10 ** -Number(rawToken.decimals),
      type: rawToken.type,
    };
    tokens.push(token);
  }

  tokens.sort((a) => (a.type === 'ERC-721' ? 1 : -1));
  tokens.unshift(await getNativeBalance(address));

  return tokens;
};

export { getTokens };
