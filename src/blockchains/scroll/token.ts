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

  if (response.data.status === '0') {
    console.error('Error occurred while retrieving native token:', response.data.message);
    return {
      name: 'Ethereum',
      symbol: 'ETH',
      link: explorer.replace('%ADDRESS%', address),
      balance: 0,
      type: 'NATIVE',
    };
  }

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
  try {
    const response = await axios.get(tokenEndpoints, {
      params: {
        module: 'account',
        action: 'tokenlist',
        address,
      },
    });

    if (!response.data.status) {
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
    } else {
      console.error('Error occurred while retrieving tokens:', response.data.message);
    }

    tokens.sort((a) => (a.type === 'ERC-721' ? 1 : -1));
  } catch (e) {
    // @ts-ignore:next-line
    console.error('Error while fetching tokens:', e.message);
  }
  try {
    tokens.unshift(await getNativeBalance(address));
  } catch (e) {
    console.error('Error while fetching native balance');
  }

  return tokens;
};

export { getTokens };
